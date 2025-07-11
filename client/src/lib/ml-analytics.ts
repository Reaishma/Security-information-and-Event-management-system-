export interface AnomalyDetectionResult {
  isAnomaly: boolean;
  score: number;
  confidence: number;
  factors: string[];
}

export class MLAnalytics {
  private behaviorBaselines: Map<string, any> = new Map();
  private trafficBaselines: Map<string, any> = new Map();

  // Simple anomaly detection based on statistical analysis
  detectUserBehaviorAnomaly(userBehavior: any[]): AnomalyDetectionResult {
    if (userBehavior.length < 5) {
      return {
        isAnomaly: false,
        score: 0,
        confidence: 0,
        factors: ['Insufficient data for analysis']
      };
    }

    const factors: string[] = [];
    let anomalyScore = 0;

    // Analyze login patterns
    const loginHours = userBehavior
      .filter(b => b.action === 'login')
      .map(b => new Date(b.timestamp).getHours());

    const avgLoginHour = loginHours.reduce((sum, hour) => sum + hour, 0) / loginHours.length;
    
    // Check for after-hours activity
    const afterHoursLogins = loginHours.filter(hour => hour < 8 || hour > 18);
    if (afterHoursLogins.length > loginHours.length * 0.3) {
      anomalyScore += 30;
      factors.push('Unusual login hours detected');
    }

    // Analyze action frequency
    const actionCounts = userBehavior.reduce((acc, b) => {
      acc[b.action] = (acc[b.action] || 0) + 1;
      return acc;
    }, {});

    const totalActions = userBehavior.length;
    Object.entries(actionCounts).forEach(([action, count]) => {
      const frequency = (count as number) / totalActions;
      if (frequency > 0.7) {
        anomalyScore += 25;
        factors.push(`High frequency of ${action} actions`);
      }
    });

    // Check for multiple IP addresses
    const uniqueIPs = new Set(userBehavior.map(b => b.sourceIp)).size;
    if (uniqueIPs > 3) {
      anomalyScore += 20;
      factors.push('Multiple source IP addresses');
    }

    const isAnomaly = anomalyScore > 50;
    const confidence = Math.min(anomalyScore, 100);

    return {
      isAnomaly,
      score: anomalyScore,
      confidence,
      factors
    };
  }

  detectNetworkAnomaly(networkTraffic: any[]): AnomalyDetectionResult {
    if (networkTraffic.length < 10) {
      return {
        isAnomaly: false,
        score: 0,
        confidence: 0,
        factors: ['Insufficient network data']
      };
    }

    const factors: string[] = [];
    let anomalyScore = 0;

    // Analyze packet sizes
    const packetSizes = networkTraffic.map(t => t.packetSize).filter(Boolean);
    const avgPacketSize = packetSizes.reduce((sum, size) => sum + size, 0) / packetSizes.length;
    const largePackets = packetSizes.filter(size => size > avgPacketSize * 3);
    
    if (largePackets.length > packetSizes.length * 0.1) {
      anomalyScore += 25;
      factors.push('Unusually large packet sizes detected');
    }

    // Analyze protocol distribution
    const protocolCounts = networkTraffic.reduce((acc, t) => {
      acc[t.protocol] = (acc[t.protocol] || 0) + 1;
      return acc;
    }, {});

    const totalPackets = networkTraffic.length;
    Object.entries(protocolCounts).forEach(([protocol, count]) => {
      const frequency = (count as number) / totalPackets;
      if (protocol === 'ICMP' && frequency > 0.2) {
        anomalyScore += 30;
        factors.push('High ICMP traffic (possible network scan)');
      }
    });

    // Check for port scanning patterns
    const connectionAttempts = networkTraffic.reduce((acc, t) => {
      const key = `${t.sourceIp}-${t.destinationIp}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const suspiciousConnections = Object.values(connectionAttempts).filter(count => (count as number) > 20);
    if (suspiciousConnections.length > 0) {
      anomalyScore += 35;
      factors.push('Potential port scanning activity');
    }

    const isAnomaly = anomalyScore > 40;
    const confidence = Math.min(anomalyScore, 100);

    return {
      isAnomaly,
      score: anomalyScore,
      confidence,
      factors
    };
  }

  correlateThreatEvents(securityEvents: any[], threatIntel: any[]): any[] {
    const correlatedEvents = [];

    for (const event of securityEvents) {
      const matchingThreats = threatIntel.filter(threat => {
        return threat.indicator === event.source || 
               threat.indicator === event.destination ||
               (threat.indicatorType === 'hash' && event.rawData?.hash === threat.indicator);
      });

      if (matchingThreats.length > 0) {
        correlatedEvents.push({
          ...event,
          correlatedThreats: matchingThreats,
          correlationScore: matchingThreats.reduce((sum, t) => sum + t.confidence, 0) / matchingThreats.length
        });
      }
    }

    return correlatedEvents.sort((a, b) => b.correlationScore - a.correlationScore);
  }

  generateRiskScore(securityEvents: any[], userBehavior: any[], threatIntel: any[]): number {
    let riskScore = 0;

    // Factor in critical security events
    const criticalEvents = securityEvents.filter(e => e.severity === 'critical');
    riskScore += criticalEvents.length * 2;

    // Factor in high-confidence threats
    const highConfidenceThreats = threatIntel.filter(t => t.confidence > 80);
    riskScore += highConfidenceThreats.length * 1.5;

    // Factor in anomalous user behavior
    const anomalousUsers = userBehavior.filter(b => b.anomalyScore && b.anomalyScore > 70);
    riskScore += anomalousUsers.length * 1.2;

    // Normalize to 0-10 scale
    return Math.min(riskScore / 10, 10);
  }
}

export const mlAnalytics = new MLAnalytics();
  
