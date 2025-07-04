import { users, leads, leadMagnets, type User, type UpsertUser, type Lead, type InsertLead, type LeadMagnet, type InsertLeadMagnet } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  
  getLeadMagnets(): Promise<LeadMagnet[]>;
  getLeadMagnet(id: number): Promise<LeadMagnet | undefined>;
  createLeadMagnet(magnet: InsertLeadMagnet): Promise<LeadMagnet>;
  updateLeadMagnet(id: number, magnet: Partial<InsertLeadMagnet>): Promise<LeadMagnet | undefined>;
  deleteLeadMagnet(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<number, Lead>;
  private leadMagnets: Map<number, LeadMagnet>;
  private currentLeadId: number;
  private currentMagnetId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.leadMagnets = new Map();
    this.currentLeadId = 1;
    this.currentMagnetId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample leads
    const sampleLeads = [
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        source: "LinkedIn Quiz",
        status: "hot",
        score: 95,
        tags: ["fitness", "premium"]
      },
      {
        name: "Mike Chen",
        email: "mike.chen@company.com",
        phone: "+1 (555) 234-5678",
        source: "Facebook Lead Magnet",
        status: "warm",
        score: 78,
        tags: ["business", "startup"]
      },
      {
        name: "Emma Davis",
        email: "emma.davis@email.com",
        phone: "+1 (555) 345-6789",
        source: "Instagram Story",
        status: "cold",
        score: 45,
        tags: ["health"]
      }
    ];

    sampleLeads.forEach(lead => {
      this.createLead(lead);
    });

    // Sample lead magnets
    const sampleMagnets = [
      {
        title: "Ultimate Fitness Challenge Guide",
        type: "eBook",
        industry: "Fitness",
        description: "A comprehensive guide to fitness challenges",
        status: "active",
        leads: 234,
        conversion: 24
      },
      {
        title: "What's Your Investment Style?",
        type: "Quiz",
        industry: "Finance",
        description: "Interactive quiz to determine investment style",
        status: "active",
        leads: 189,
        conversion: 31
      }
    ];

    sampleMagnets.forEach(magnet => {
      this.createLeadMagnet(magnet);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id);
    if (existingUser) {
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        updatedAt: new Date(),
      };
      this.users.set(userData.id, updatedUser);
      return updatedUser;
    } else {
      const newUser: User = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(userData.id, newUser);
      return newUser;
    }
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const now = new Date();
    const lead: Lead = { 
      ...insertLead, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.leads.set(id, lead);
    return lead;
  }

  async updateLead(id: number, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;

    const updatedLead: Lead = {
      ...lead,
      ...updates,
      updatedAt: new Date()
    };
    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    return this.leads.delete(id);
  }

  async getLeadMagnets(): Promise<LeadMagnet[]> {
    return Array.from(this.leadMagnets.values());
  }

  async getLeadMagnet(id: number): Promise<LeadMagnet | undefined> {
    return this.leadMagnets.get(id);
  }

  async createLeadMagnet(insertMagnet: InsertLeadMagnet): Promise<LeadMagnet> {
    const id = this.currentMagnetId++;
    const now = new Date();
    const magnet: LeadMagnet = { 
      ...insertMagnet, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.leadMagnets.set(id, magnet);
    return magnet;
  }

  async updateLeadMagnet(id: number, updates: Partial<InsertLeadMagnet>): Promise<LeadMagnet | undefined> {
    const magnet = this.leadMagnets.get(id);
    if (!magnet) return undefined;

    const updatedMagnet: LeadMagnet = {
      ...magnet,
      ...updates,
      updatedAt: new Date()
    };
    this.leadMagnets.set(id, updatedMagnet);
    return updatedMagnet;
  }

  async deleteLeadMagnet(id: number): Promise<boolean> {
    return this.leadMagnets.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async updateLead(id: number, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }

  async deleteLead(id: number): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getLeadMagnets(): Promise<LeadMagnet[]> {
    return await db.select().from(leadMagnets).orderBy(desc(leadMagnets.createdAt));
  }

  async getLeadMagnet(id: number): Promise<LeadMagnet | undefined> {
    const [magnet] = await db.select().from(leadMagnets).where(eq(leadMagnets.id, id));
    return magnet;
  }

  async createLeadMagnet(insertMagnet: InsertLeadMagnet): Promise<LeadMagnet> {
    const [magnet] = await db.insert(leadMagnets).values(insertMagnet).returning();
    return magnet;
  }

  async updateLeadMagnet(id: number, updates: Partial<InsertLeadMagnet>): Promise<LeadMagnet | undefined> {
    const [magnet] = await db
      .update(leadMagnets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(leadMagnets.id, id))
      .returning();
    return magnet;
  }

  async deleteLeadMagnet(id: number): Promise<boolean> {
    const result = await db.delete(leadMagnets).where(eq(leadMagnets.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
