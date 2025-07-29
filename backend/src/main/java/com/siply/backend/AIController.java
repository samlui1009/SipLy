package com.siply.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final OpenAiChatModel chatModel;
    // We need a Chat client

    @Autowired
    public AIController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/bev-bot-analysis")
    public String generateResponse(@RequestParam(defaultValue = "What should I drink?") String message) {
        String promptText = """
                Provide the user with some suggestions on what they can drink to stay healthy and avoid sugar and caffeine.
                Only return the rewritten sentence. Do not include explanations.
                """.formatted(message);
        Prompt prompt = new Prompt(new UserMessage(promptText));
        ChatResponse response = chatModel.call(prompt);
        String result = response.getResult().getOutput().getText();
        return result;
        // What in tarnation is this
    }
}