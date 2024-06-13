package main;

import java.awt.*;

public class Player {
    private int x, y;

    public Player() {
        this.x = 100;
        this.y = 100;
    }

    public void move(int dx, int dy) {
        x += dx;
        y += dy;
    }

    public void update() {
        // Add gravity, collision detection, etc. here
    }

    public void draw(Graphics g) {
        g.setColor(Color.RED);
        g.fillRect(x, y, Config.BLOCK_SIZE, Config.BLOCK_SIZE);
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}
