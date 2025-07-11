import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const securityEvents = pgTable("security_events", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  source: text("source").notNull(),
  destination: text("destination"),
  eventType: text("event_type").notNull(),
  severity: text("severity").notNull(),
  protocol: text("protocol"),
  port: integer("port"),
  message: text("message").notNull(),
  rawData: jsonb("raw_data"),
  platform: text("platform").notNull(), // qradar, splunk, elk, wireshark, alienvault
  processed: boolean("processed").default(false),
});

export const threatIntelligence = pgTable("threat_intelligence", {
  id: serial("id").primaryKey(),
  indicator: text("indicator").notNull(),
  indicatorType: text("indicator_type").notNull(), // ip, domain, hash, url
  threatType: text("threat_type").notNull(),
  severity: text("severity").notNull(),
  confidence: integer("confidence").notNull(), // 0-100
  source: text("source").notNull(),
  firstSeen: timestamp("first_seen").notNull().defaultNow(),
  lastSeen: timestamp("last_seen").notNull().defaultNow(),
  description: text("description"),
});

export const networkTraffic = pgTable("network_traffic", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  sourceIp: text("source_ip").notNull(),
  destinationIp: text("destination_ip").notNull(),
  sourcePort: integer("source_port"),
  destinationPort: integer("destination_port"),
  protocol: text("protocol").notNull(),
  packetSize: integer("packet_size"),
  flags: text("flags"),
  payload: text("payload"),
});

export const userBehavior = pgTable("user_behavior", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  sourceIp: text("source_ip"),
  deviceInfo: text("device_info"),
  anomalyScore: integer("anomaly_score"), // 0-100
  riskLevel: text("risk_level"), // low, medium, high, critical
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSecurityEventSchema = createInsertSchema(securityEvents).omit({
  id: true,
  timestamp: true,
});

export const insertThreatIntelligenceSchema = createInsertSchema(threatIntelligence).omit({
  id: true,
  firstSeen: true,
  lastSeen: true,
});

export const insertNetworkTrafficSchema = createInsertSchema(networkTraffic).omit({
  id: true,
  timestamp: true,
});

export const insertUserBehaviorSchema = createInsertSchema(userBehavior).omit({
  id: true,
  timestamp: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SecurityEvent = typeof securityEvents.$inferSelect;
export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;
export type ThreatIntelligence = typeof threatIntelligence.$inferSelect;
export type InsertThreatIntelligence = z.infer<typeof insertThreatIntelligenceSchema>;
export type NetworkTraffic = typeof networkTraffic.$inferSelect;
export type InsertNetworkTraffic = z.infer<typeof insertNetworkTrafficSchema>;
export type UserBehavior = typeof userBehavior.$inferSelect;
export type InsertUserBehavior = z.infer<typeof insertUserBehaviorSchema>;
