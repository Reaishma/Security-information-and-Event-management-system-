export const generateMockSecurityEvent = () => {
  const eventTypes = ['login_failure', 'port_scan', 'malware_detected', 'unauthorized_access', 'data_exfiltration'];
  const severities = ['low', 'medium', 'high', 'critical'];
  const sources = ['192.168.1.100', '10.0.0.25', '172.16.0.50', '203.0.113.1', '198.51.100.1'];
  const platforms = ['qradar', 'splunk', 'elk', 'wireshark', 'alienvault'];

  return {
    source: sources[Math.floor(Math.random() * sources.length)],
    destination: sources[Math.floor(Math.random() * sources.length)],
    eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS'][Math.floor(Math.random() * 4)],
    port: Math.floor(Math.random() * 65535),
    message: `Security event detected: ${eventTypes[Math.floor(Math.random() * eventTypes.length)]}`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    rawData: {
      timestamp: new Date().toISOString(),
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      request_size: Math.floor(Math.random() * 10000)
    }
  };
};

export const generateMockThreatIntelligence = () => {
  const indicators = ['185.234.72.123', '7d4b2c8e9f1a3b5c', 'malware.example.com', 'http://evil.site.com'];
  const indicatorTypes = ['ip', 'hash', 'domain', 'url'];
  const threatTypes = ['APT', 'Trojan', 'Ransomware', 'Botnet', 'Phishing'];
  const severities = ['low', 'medium', 'high', 'critical'];
  const sources = ['VirusTotal', 'AlienVault OTX', 'IBM X-Force', 'Recorded Future'];

  const randomIndex = Math.floor(Math.random() * indicators.length);

  return {
    indicator: indicators[randomIndex],
    indicatorType: indicatorTypes[randomIndex],
    threatType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    confidence: Math.floor(Math.random() * 100),
    source: sources[Math.floor(Math.random() * sources.length)],
    description: `Threat intelligence indicator detected through automated analysis`
  };
};

export const generateMockNetworkTraffic = () => {
  const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS'];
  const ips = ['192.168.1.100', '10.0.0.25', '172.16.0.50', '8.8.8.8', '1.1.1.1'];

  return {
    sourceIp: ips[Math.floor(Math.random() * ips.length)],
    destinationIp: ips[Math.floor(Math.random() * ips.length)],
    sourcePort: Math.floor(Math.random() * 65535),
    destinationPort: Math.floor(Math.random() * 65535),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    packetSize: Math.floor(Math.random() * 1500) + 64,
    flags: ['SYN', 'ACK', 'FIN', 'RST'][Math.floor(Math.random() * 4)],
    payload: 'Network packet data...'
  };
};

export const generateMockUserBehavior = () => {
  const userIds = ['admin@corp.com', 'john.doe@corp.com', 'jane.smith@corp.com', 'bob.wilson@corp.com'];
  const actions = ['login', 'file_access', 'email_send', 'database_query', 'system_command'];
  const riskLevels = ['low', 'medium', 'high', 'critical'];

  return {
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    sourceIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
    deviceInfo: 'Windows 10 - Chrome',
    anomalyScore: Math.floor(Math.random() * 100),
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)]
  };
};
