import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertLeadSchema, insertLeadMagnetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Lead routes (protected)
  app.get("/api/leads", isAuthenticated, async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lead = await storage.getLead(id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  app.put("/api/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertLeadSchema.partial().parse(req.body);
      const lead = await storage.updateLead(id, validatedData);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteLead(id);
      if (!success) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json({ message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  // Lead Magnet routes (protected)
  app.get("/api/lead-magnets", isAuthenticated, async (req, res) => {
    try {
      const magnets = await storage.getLeadMagnets();
      res.json(magnets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead magnets" });
    }
  });

  app.get("/api/lead-magnets/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const magnet = await storage.getLeadMagnet(id);
      if (!magnet) {
        return res.status(404).json({ message: "Lead magnet not found" });
      }
      res.json(magnet);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead magnet" });
    }
  });

  app.post("/api/lead-magnets", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertLeadMagnetSchema.parse(req.body);
      const magnet = await storage.createLeadMagnet(validatedData);
      res.status(201).json(magnet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead magnet data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead magnet" });
    }
  });

  app.put("/api/lead-magnets/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertLeadMagnetSchema.partial().parse(req.body);
      const magnet = await storage.updateLeadMagnet(id, validatedData);
      if (!magnet) {
        return res.status(404).json({ message: "Lead magnet not found" });
      }
      res.json(magnet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead magnet data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update lead magnet" });
    }
  });

  app.delete("/api/lead-magnets/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteLeadMagnet(id);
      if (!success) {
        return res.status(404).json({ message: "Lead magnet not found" });
      }
      res.json({ message: "Lead magnet deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete lead magnet" });
    }
  });

  // Dashboard stats endpoint (protected)
  app.get("/api/dashboard/stats", isAuthenticated, async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const magnets = await storage.getLeadMagnets();
      
      const stats = {
        totalLeads: leads.length,
        hotLeads: leads.filter(l => l.status === "hot").length,
        conversionRate: leads.length > 0 ? (leads.filter(l => l.status === "qualified").length / leads.length * 100).toFixed(1) : "0.0",
        activeFunnels: magnets.filter(m => m.status === "active").length,
        averageScore: leads.length > 0 ? Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length) : 0
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
