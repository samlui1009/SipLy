package com.siply.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.siply.backend.model.BeverageLog;
import com.siply.backend.model.HealthGoals;
import com.siply.backend.repository.UserRepository;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final UserRepository userRepository; 
    private final OpenAiChatModel chatModel;

    @Autowired
    public AIController(OpenAiChatModel chatModel, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.chatModel = chatModel;
    }

    @GetMapping("/bev-bot-analysis/{id}")
    public String generateResponse(@PathVariable Long id, @RequestParam(defaultValue = "What should I drink?") String message) {
        return userRepository.findById(id).map(user -> {
            if (user.getBeverageLog() == null) {
                user.setNewBeverageLog(new BeverageLog());
            }
            // Null checks
            if (user.getHealthGoals() == null) {
                user.setNewHealthGoals(new HealthGoals());
            }
            // Null safety checks
            ObjectMapper objMapper = new ObjectMapper();
            BeverageLog userLog = user.getBeverageLog();
            // Return this as an Object 
            HealthGoals userGoals = user.getHealthGoals();
            // Return this as an object as well
            String userNameString = user.getName();
            // Returns this as a String that the LLM can parse to make the interaction more dynamic 
            boolean isFinalized = user.getBeverageLog().getDailyStatus();
            // This should return back a boolean value
            boolean isEmpty = user.getBeverageLog().getAllBeverages().isEmpty();
            // Another conditional check for AI - Is the beverage log empty?

            try {
                String bevLogString = objMapper.writeValueAsString(userLog);
                String userGoalsString = objMapper.writeValueAsString(userGoals);
                String isFinalizedString = isFinalized ? "The user's beverage log is finalized. Proceed with analysis." : "The user's beverage log is not finalized. Stop here.";
                // Returns this back as String - however, the LLM cannot process true or false - it can only process explicit instructions such as the above
                String isEmptyString = isEmpty ? "The user's beverage log is empty. Encourage the user to be more diligent with tracking. Do not proceed with analysis." : "The user's beverage log is not empty. Proceed with analysis.";
                // Converted both of these objects to Strings
                String systemInstructions = """
                    You are BevBot. Return ONLY a single valid JSON as a response. No additional text is required.
                    Here is the schema to follow.
                    
                    Schema:
                    {
                      "summary": string,
                      "recommendations": [
                        {"title": string, "description": string}
                      ]
                    }

                    Rules:
                    • If the beverage log is NOT finalized, output:
                    {"summary": "Finalize your log for the day to get a full analysis from me!", "recommendations": [] }
                    • If the beverage log is EMPTY, output:
                    {"summary": "Your log is empty - did you remember to log your beverages today?", "recommendations": [] }
                    
                    • If ALL limits are within the user goals:
                    * summary: MUST be less than 12 words, ensure that the response is neutral and factual
                    * recommendations: []

                    • If ANY limit is exceeded:
                    * summary: Must be less than 12 words, state which area to improve upon 
                    * recommendations: Provide a maximum of 2 beverage alternatives, with the proper title and a short description with logical rationale that is less than 18 words

                    """.formatted(userNameString, isFinalizedString, isEmptyString);
                String promptText = """
                    Based off of the following data:

                    BEVERAGE LOG
                    %s

                    HEALTH GOALS
                    %s

                    Use this data to evaluate their intake and provide feedback only if the beverage log is finalized and not empty. 

                    """.formatted(bevLogString, userGoalsString);

                Prompt prompt = new Prompt(List.of(
                    new org.springframework.ai.chat.messages.SystemMessage(systemInstructions),
                    new UserMessage(promptText)
                ));
                
                ChatResponse response = chatModel.call(prompt);
                String result = response.getResult().getOutput().getText();
                return result;                
            } catch (JsonProcessingException e) {
                return "Failed to process data for BevBot analysis";
            }
        }).orElse("User not found");
    }
}