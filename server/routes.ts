import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // No backend routes needed for calculator - pure frontend application
  const httpServer = createServer(app);
  return httpServer;
}
