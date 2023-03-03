import pygame
import random

# initialize pygame
pygame.init()

# set up the display
WIDTH = 800
HEIGHT = 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Arrow Key Game")

# set up the game clock
clock = pygame.time.Clock()

# define the colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# define the player
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(WHITE)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 10
        self.speed_x = 0

    def update(self):
        self.speed_x = 0
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.speed_x = -5
        if keys[pygame.K_RIGHT]:
            self.speed_x = 5
        self.rect.x += self.speed_x
        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH

# define the obstacle
class Obstacle(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((30, 30))
        self.image.fill(BLACK)
        self.rect = self.image.get_rect()
        self.rect.x = random.randrange(WIDTH - self.rect.width)
        self.rect.y = random.randrange(-100, -40)
        self.speed_y = random.randrange(1, 8)

    def update(self):
        self.rect.y += self.speed_y
        if self.rect.top > HEIGHT + 10:
            self.rect.x = random.randrange(WIDTH - self.rect.width)
            self.rect.y = random.randrange(-100, -40)
            self.speed_y = random.randrange(1, 8)

# set up the sprites
all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)
obstacles = pygame.sprite.Group()
for i in range(8):
    obstacle = Obstacle()
    all_sprites.add(obstacle)
    obstacles.add(obstacle)

# set up the game loop
running = True
while running:

    # keep the game running at the right speed
    clock.tick(60)

    # process input (events)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # update the game
    all_sprites.update()

    # check for collisions
    hits = pygame.sprite.spritecollide(player, obstacles, False)
    if hits:
        running = False

    # draw/render
    screen.fill(WHITE)
    all_sprites.draw(screen)

    # flip the display
    pygame.display.flip()

# exit the game
pygame.quit()
