package main;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class Game extends JPanel implements ActionListener, KeyListener {
    private Timer timer;
    private Player player;
    private Chunk chunk;
    private boolean debugMode = false;

    public Game() {
        setFocusable(true);
        setPreferredSize(new Dimension(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT));
        addKeyListener(this);
        player = new Player();
        chunk = new Chunk();
        timer = new Timer(1000 / Config.FPS, this);
        timer.start();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        setBackground(Config.SKY_COLOR);
        chunk.draw(g);
        player.draw(g);
        if (debugMode) {
            g.setColor(Color.WHITE);
            g.drawString("FPS: " + timer.getDelay(), 10, 10);
            g.drawString("Coordinates: " + player.getX() + ", " + player.getY(), 10, 25);
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        player.update();
        repaint();
    }

    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();
        if (key == KeyEvent.VK_LEFT) {
            player.move(-5, 0);
        } else if (key == KeyEvent.VK_RIGHT) {
            player.move(5, 0);
        } else if (key == KeyEvent.VK_UP) {
            player.move(0, -5);
        } else if (key == KeyEvent.VK_DOWN) {
            player.move(0, 5);
        } else if (key == KeyEvent.VK_BRACELEFT) {
            debugMode = !debugMode;
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {}

    @Override
    public void keyTyped(KeyEvent e) {}

    public static void main(String[] args) {
        JFrame frame = new JFrame("Minecraft Clone");
        Game game = new Game();
        frame.add(game);
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
