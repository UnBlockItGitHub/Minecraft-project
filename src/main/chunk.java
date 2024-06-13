package main;

import java.awt.*;

public class Chunk {
    private int[][][] chunkData;

    public Chunk() {
        chunkData = new int[Config.CHUNK_SIZE][Config.CHUNK_SIZE][Config.WORLD_HEIGHT];
        generateChunk();
    }

    private void generateChunk() {
        for (int x = 0; x < Config.CHUNK_SIZE; x++) {
            for (int y = 0; y < Config.CHUNK_SIZE; y++) {
                chunkData[x][y][0] = 1;  // Ground layer
            }
        }
    }

    public void draw(Graphics g) {
        for (int x = 0; x < Config.CHUNK_SIZE; x++) {
            for (int y = 0; y < Config.CHUNK_SIZE; y++) {
                for (int z = 0; z < Config.WORLD_HEIGHT; z++) {
                    if (chunkData[x][y][z] != 0) {
                        g.setColor(new Color(139, 69, 19));  // Brown color for dirt blocks
                        g.fillRect(x * Config.BLOCK_SIZE, y * Config.BLOCK_SIZE, Config.BLOCK_SIZE, Config.BLOCK_SIZE);
                    }
                }
            }
        }
    }
}
