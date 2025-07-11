import { 
  users, 
  securityEvents, 
  threatIntelligence, 
  networkTraffic, 
  userBehavior,
  type User, 
  type InsertUser,
  type SecurityEvent,
  type InsertSecurityEvent,
  type ThreatIntelligence,
  type InsertThreatIntelligence,
  type NetworkTraffic,
  type InsertNetworkTraffic,
  type UserBehavior,
  type InsertUserBehavior
} from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Security Events
  getSecurityEvents(limit?: number, platform?: string): Promise<SecurityEvent[]>;
  createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent>;
  getEventsByTimeRange(startTime: Date, endTime: Date): Promise<SecurityEvent[]>;
  getEventsBySeverity(severity: string): Promise<SecurityEvent[]>;

  // Threat Intelligence
  getThreatIntelligence(limit?: number): Promise<ThreatIntelligence[]>;
  createThreatIntelligence(threat: InsertThreatIntelligence): Promise<ThreatIntelligence>;
  getThreatByIndicator(indicator: string): Promise<ThreatIntelligence | undefined>;

  // Network Traffic
  getNetworkTraffic(limit?: number): Promise<NetworkTraffic[]>;
  createNetworkTraffic(traffic: InsertNetworkTraffic): Promise<NetworkTraffic>;
  getTrafficByTimeRange(startTime: Date, endTime: Date): Promise<NetworkTraffic[]>;

  // User Behavior
  getUserBehavior(limit?: number): Promise<UserBehavior[]>;
  createUserBehavior(behavior: InsertUserBehavior): Promise<UserBehavior>;
  getBehaviorByUser(userId: string): Promise<UserBehavior[]>;
  getAnomalousActivity(): Promise<UserBehavior[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private securityEvents: Map<number, SecurityEvent>;
  private threatIntelligence: Map<number, ThreatIntelligence>;
  private networkTraffic: Map<number, NetworkTraffic>;
  private userBehavior: Map<number, UserBehavior>;
  private currentUserId: number;
  private currentEventId: number;
  private currentThreatId: number;
  private currentTrafficId: number;
  private currentBehaviorId: number;

  constructor() {
    this.users = new Map();
    this.securityEvents = new Map();
    this.threatIntelligence = new Map();
    this.networkTraffic = new Map();
    this.userBehavior = new Map();
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentThreatId = 1;
    this.currentTrafficId = 1;
    this.currentBehaviorId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSecurityEvents(limit = 100, platform?: string): Promise<SecurityEvent[]> {
    let events = Array.from(this.securityEvents.values());
    if (platform) {
      events = events.filter(event => event.platform === platform);
    }
    return events
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const id = this.currentEventId++;
    const event: SecurityEvent = { 
      ...insertEvent, 
      id, 
      timestamp: new Date(),
      processed: false 
    };
    this.securityEvents.set(id, event);
    return event;
  }

  async getEventsByTimeRange(startTime: Date, endTime: Date): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values()).filter(
      event => new Date(event.timestamp) >= startTime && new Date(event.timestamp) <= endTime
    );
  }

  async getEventsBySeverity(severity: string): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values()).filter(
      event => event.severity === severity
    );
  }

  async getThreatIntelligence(limit = 100): Promise<ThreatIntelligence[]> {
    return Array.from(this.threatIntelligence.values())
      .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
      .slice(0, limit);
  }

  async createThreatIntelligence(insertThreat: InsertThreatIntelligence): Promise<ThreatIntelligence> {
    const id = this.currentThreatId++;
    const now = new Date();
    const threat: ThreatIntelligence = { 
      ...insertThreat, 
      id, 
      firstSeen: now,
      lastSeen: now 
    };
    this.threatIntelligence.set(id, threat);
    return threat;
  }

  async getThreatByIndicator(indicator: string): Promise<ThreatIntelligence | undefined> {
    return Array.from(this.threatIntelligence.values()).find(
      threat => threat.indicator === indicator
    );
  }

  async getNetworkTraffic(limit = 100): Promise<NetworkTraffic[]> {
    return Array.from(this.networkTraffic.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async createNetworkTraffic(insertTraffic: InsertNetworkTraffic): Promise<NetworkTraffic> {
    const id = this.currentTrafficId++;
    const traffic: NetworkTraffic = { 
      ...insertTraffic, 
      id, 
      timestamp: new Date() 
    };
    this.networkTraffic.set(id, traffic);
    return traffic;
  }

  async getTrafficByTimeRange(startTime: Date, endTime: Date): Promise<NetworkTraffic[]> {
    return Array.from(this.networkTraffic.values()).filter(
      traffic => new Date(traffic.timestamp) >= startTime && new Date(traffic.timestamp) <= endTime
    );
  }

  async getUserBehavior(limit = 100): Promise<UserBehavior[]> {
    return Array.from(this.userBehavior.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async createUserBehavior(insertBehavior: InsertUserBehavior): Promise<UserBehavior> {
    const id = this.currentBehaviorId++;
    const behavior: UserBehavior = { 
      ...insertBehavior, 
      id, 
      timestamp: new Date() 
    };
    this.userBehavior.set(id, behavior);
    return behavior;
  }

  async getBehaviorByUser(userId: string): Promise<UserBehavior[]> {
    return Array.from(this.userBehavior.values()).filter(
      behavior => behavior.userId === userId
    );
  }

  async getAnomalousActivity(): Promise<UserBehavior[]> {
    return Array.from(this.userBehavior.values()).filter(
      behavior => behavior.anomalyScore && behavior.anomalyScore > 70
    );
  }
}

export const storage = new MemStorage();
      
