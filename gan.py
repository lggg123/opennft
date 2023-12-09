import torch
import torch.nn as nn

class Generator(nn.Module):
    def __init__(self):
        super(Generator, self).__init__()
        self.main = nn.Sequential(
            nn.Linear(100, 256),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(256, 512),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(512, 1024),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(1024, 784),
            nn.Tanh()
        )

    def forward(self, input):
        return self.main(input)

class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        self.main = nn.Sequential(
            nn.Linear(784, 1024),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Dropout(0.3),
            nn.Linear(1024, 512),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )

    def forward(self, input):
        return self.main(input)

generator = Generator()
discriminator = Discriminator()

criterion = nn.BCELoss()
optimizerG = torch.optim.Adam(generator.parameters(), lr=0.0002, betas=(0.5, 0.999))
optimizerD = torch.optim.Adam(discriminator.parameters(), lr=0.0002, betas=(0.5, 0.999))

num_epochs = 50

for epoch in range(num_epochs):
    for i, data in enumerate(dataloader, 0):
        # Update Discriminator: maximize log(D(x)) + log(1 - D(G(z)))
        discriminator.zero_grad()
        # Train with real data
        real, _ = data
        output = discriminator(real).view(-1)
        # Calculate loss on real data
        errD_real = criterion(output, torch.ones_like(output))
        errD_real.backward()

        # Train with fake data
        noise = torch.randn(batch_size, 100)
        fake = generator(noise)
        output = discriminator(fake.detach()).view(-1)
        # Calculate loss on fake data
        errD_fake = criterion(output, torch.zeros_like(output))
        errD_fake.backward()
        optimizerD.step()

        # Update Generator: maximize log(D(G(z)))
        generator.zero_grad()
        output = discriminator(fake).view(-1)
        # Calculate loss based on how the discriminator evaluated generated data
        errG = criterion(output, torch.ones_like(output))
        errG.backward()
        optimizerG.step()