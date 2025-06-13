import torch
import torch.nn as nn
import torch.nn.functional as F

class HandwritingEncoder(nn.Module):
    def __init__(self, input_dim=2, hidden_dim=256, num_layers=3):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_dim,
            hidden_size=hidden_dim,
            num_layers=num_layers,
            batch_first=True,
            bidirectional=True
        )
        self.fc = nn.Linear(hidden_dim * 2, hidden_dim)
        
    def forward(self, x):
        # x shape: (batch_size, seq_len, input_dim)
        lstm_out, _ = self.lstm(x)
        # lstm_out shape: (batch_size, seq_len, hidden_dim * 2)
        style_embedding = self.fc(lstm_out[:, -1, :])
        return style_embedding

class HandwritingDecoder(nn.Module):
    def __init__(self, style_dim=256, hidden_dim=512, output_dim=2):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=style_dim,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True
        )
        self.fc = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, style_embedding, seq_len):
        # style_embedding shape: (batch_size, style_dim)
        style_embedding = style_embedding.unsqueeze(1).repeat(1, seq_len, 1)
        # style_embedding shape: (batch_size, seq_len, style_dim)
        lstm_out, _ = self.lstm(style_embedding)
        # lstm_out shape: (batch_size, seq_len, hidden_dim)
        output = self.fc(lstm_out)
        return output

class HandwritingModel(nn.Module):
    def __init__(self, input_dim=2, style_dim=256, hidden_dim=512, output_dim=2):
        super().__init__()
        self.encoder = HandwritingEncoder(input_dim=input_dim, hidden_dim=style_dim)
        self.decoder = HandwritingDecoder(
            style_dim=style_dim,
            hidden_dim=hidden_dim,
            output_dim=output_dim
        )
        
    def forward(self, style_input, text_embedding, seq_len):
        # style_input shape: (batch_size, style_seq_len, input_dim)
        # text_embedding shape: (batch_size, text_seq_len, embedding_dim)
        style_embedding = self.encoder(style_input)
        # style_embedding shape: (batch_size, style_dim)
        output = self.decoder(style_embedding, seq_len)
        # output shape: (batch_size, seq_len, output_dim)
        return output

    def generate(self, style_input, text_embedding, max_len=100):
        self.eval()
        with torch.no_grad():
            style_embedding = self.encoder(style_input)
            output = self.decoder(style_embedding, max_len)
        return output 