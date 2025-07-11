import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { 
  insertSecurityEventSchema, 
  insertThreatIntelligenceSchema,
  insertNetworkTrafficSchema,
  insertUserBehaviorSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Security Events API
  app.get("/api/security-events", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const platform = req.query.platform as string;
      const events = await storage.getSecurityEvents(limit, platform);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch security events" });
    }
  });

  app.post("/api/security-events", async (req, res) => {
    try {
      const validatedData = insertSecurityEventSchema.parse(req.body);
      const event = await storage.createSecurityEvent(validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid security event data" });
    }
  });

  app.get("/api/security-events/severity/:severity", async (req, res) => {
    try {
      const { severity } = req.params;
      const events = await storage.getEventsBySeverity(severity);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events by severity" });
    }
  });

  // Threat Intelligence API
  app.get("/api/threat-intelligence", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const threats = await storage.getThreatIntelligence(limit);
      res.json(threats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch threat intelligence" });
    }
  });

  app.post("/api/threat-intelligence", async (req, res) => {
    try {
      const validatedData = insertThreatIntelligenceSchema.parse(req.body);
      const threat = await storage.createThreatIntelligence(validatedData);
      res.json(threat);
    } catch (error) {
      res.status(400).json({ message: "Invalid threat intelligence data" });
    }
  });

  // Network Traffic API
  app.get("/api/network-traffic", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const traffic = await storage.getNetworkTraffic(limit);
      res.json(traffic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch network traffic" });
    }
  });

  app.post("/api/network-traffic", async (req, res) => {
    try {
      const validatedData = insertNetworkTrafficSchema.parse(req.body);
      const traffic = await storage.createNetworkTraffic(validatedData);
      res.json(traffic);
    } catch (error) {
      res.status(400).json({ message: "Invalid network traffic data" });
    }
  });

  // User Behavior API
  app.get("/api/user-behavior", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const behavior = await storage.getUserBehavior(limit);
      res.json(behavior);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user behavior" });
    }
  });

  app.get("/api/user-behavior/anomalous", async (req, res) => {
    try {
      const anomalies = await storage.getAnomalousActivity();
      res.json(anomalies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch anomalous activity" });
    }
  });

  app.post("/api/user-behavior", async (req, res) => {
    try {
      const validatedData = insertUserBehaviorSchema.parse(req.body);
      const behavior = await storage.createUserBehavior(validatedData);
      res.json(behavior);
    } catch (error) {
      res.status(400).json({ message: "Invalid user behavior data" });
    }
  });

  // Analytics API
  app.get("/api/analytics/dashboard-stats", async (req, res) => {
    try {
      const now = new Date();
      const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      const recentEvents = await storage.getEventsByTimeRange(hourAgo, now);
      const criticalEvents = await storage.getEventsBySeverity("critical");
      const threats = await storage.getThreatIntelligence(10);
      const anomalies = await storage.getAnomalousActivity();
      
      const stats = {
        activeOffenses: criticalEvents.length,
        eventsPerSecond: Math.floor(recentEvents.length / 3600),
        flowsPerMinute: Math.floor(Math.random() * 100000) + 50000,
        riskScore: threats.length > 0 ? (threats.reduce((sum, t) => sum + t.confidence, 0) / threats.length / 10).toFixed(1) : "0.0",
        totalEvents: recentEvents.length,
        activethreats: threats.length,
        vulnerabilities: Math.floor(Math.random() * 500) + 200,
        detectionRate: "92.3",
        anomalousUsers: anomalies.length
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message);
        console.log('Received:', data);
      } catch (error) {
        console.error('Invalid JSON received:', message);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });

    // Send real-time updates every 5 seconds
    const interval = setInterval(async () => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          const now = new Date();
          const fiveSecondsAgo = new Date(now.getTime() - 5000);
          const recentEvents = await storage.getEventsByTimeRange(fiveSecondsAgo, now);
          
          ws.send(JSON.stringify({
            type: 'security_events_update',
            data: recentEvents
          }));
        } catch (error) {
          console.error('Error sending WebSocket update:', error);
        }
      }
    }, 5000);

    ws.on('close', () => {
      clearInterval(interval);
    });
  });

  return httpServer;
}
