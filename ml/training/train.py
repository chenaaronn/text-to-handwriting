import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
import wandb
from tqdm import tqdm
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.handwriting_model import HandwritingModel

def train_epoch(model, dataloader, optimizer, criterion, device):
    model.train()
    total_loss = 0
    
    for batch in tqdm(dataloader, desc="Training"):
        style_input = batch['style_input'].to(device)
        text_embedding = batch['text_embedding'].to(device)
        target = batch['target'].to(device)
        
        optimizer.zero_grad()
        output = model(style_input, text_embedding, target.size(1))
        loss = criterion(output, target)
        
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    return total_loss / len(dataloader)

def validate(model, dataloader, criterion, device):
    model.eval()
    total_loss = 0
    
    with torch.no_grad():
        for batch in tqdm(dataloader, desc="Validation"):
            style_input = batch['style_input'].to(device)
            text_embedding = batch['text_embedding'].to(device)
            target = batch['target'].to(device)
            
            output = model(style_input, text_embedding, target.size(1))
            loss = criterion(output, target)
            
            total_loss += loss.item()
    
    return total_loss / len(dataloader)

def train(config):
    # Initialize wandb
    wandb.init(project="handwriteai", config=config)
    
    # Set device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # Initialize model
    model = HandwritingModel(
        input_dim=config['input_dim'],
        style_dim=config['style_dim'],
        hidden_dim=config['hidden_dim'],
        output_dim=config['output_dim']
    ).to(device)
    
    # Initialize optimizer and loss function
    optimizer = optim.Adam(model.parameters(), lr=config['learning_rate'])
    criterion = nn.MSELoss()
    
    # Load datasets and create dataloaders
    # TODO: Implement dataset loading
    train_loader = None
    val_loader = None
    
    # Training loop
    for epoch in range(config['epochs']):
        train_loss = train_epoch(model, train_loader, optimizer, criterion, device)
        val_loss = validate(model, val_loader, criterion, device)
        
        # Log metrics
        wandb.log({
            "epoch": epoch,
            "train_loss": train_loss,
            "val_loss": val_loss
        })
        
        # Save checkpoint
        if (epoch + 1) % config['save_interval'] == 0:
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'train_loss': train_loss,
                'val_loss': val_loss
            }, f"checkpoints/model_epoch_{epoch+1}.pt")
    
    wandb.finish()

if __name__ == "__main__":
    config = {
        'input_dim': 2,
        'style_dim': 256,
        'hidden_dim': 512,
        'output_dim': 2,
        'learning_rate': 0.001,
        'epochs': 100,
        'save_interval': 5
    }
    
    train(config) 