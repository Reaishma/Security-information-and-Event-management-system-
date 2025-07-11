import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Gauge, Activity, Shield, ExternalLink } from "lucide-react";

export default function QRadarTab() {
  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/dashboard-stats"],
    refetchInterval: 5000,
  });

  const { data: securityEvents } = useQuery({
    queryKey: ["/api/security-events"],
    queryFn: () => fetch("/api/security-events?platform=qradar&limit=10").then(res => res.json()),
    refetchInterval: 3000,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-siem-red border-siem-red';
      case 'high': return 'text-siem-amber border-siem-amber';
      case 'medium': return 'text-siem-green border-siem-green';
      case 'low': return 'text-siem-blue-light border-siem-blue-light';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-siem-red text-white';
      case 'high': return 'bg-siem-amber text-white';
      case 'medium': return 'bg-siem-green text-white';
      case 'low': return 'bg-siem-blue-light text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="p-6 bg-siem-dark">
      {/* QRadar Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Offenses</p>
                <p className="text-2xl font-bold text-siem-red">{stats?.activeOffenses || 0}</p>
              </div>
              <AlertTriangle className="text-siem-red text-2xl" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Events/Sec</p>
                <p className="text-2xl font-bold text-siem-green">{stats?.eventsPerSecond || 0}</p>
              </div>
              <Gauge className="text-siem-green text-2xl" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Flows/Min</p>
                <p className="text-2xl font-bold text-siem-blue-light">{stats?.flowsPerMinute || 0}</p>
              </div>
              <Activity className="text-siem-blue-light text-2xl" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Risk Score</p>
                <p className="text-2xl font-bold text-siem-amber">{stats?.riskScore || "0.0"}</p>
              </div>
              <Shield className="text-siem-amber text-2xl" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QRadar Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Offense Management */}
        <div className="lg:col-span-2">
          <Card className="bg-siem-gray border-siem-gray-light">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">High Priority Offenses</h3>
                <button className="text-siem-blue-light hover:text-blue-400">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {securityEvents?.slice(0, 5).map((event: any) => (
                  <div key={event.id} className={`bg-siem-dark p-4 rounded border-l-4 ${getSeverityColor(event.severity)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${getSeverityColor(event.severity).split(' ')[0]}`}>
                          {event.message}
                        </p>
                        <p className="text-sm text-gray-400">
                          Source: {event.source} | Type: {event.eventType}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getSeverityBadge(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
                {!securityEvents?.length && (
                  <div className="text-center py-8 text-gray-400">
                    No security events available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Activity Monitor */}
        <div>
          <Card className="bg-siem-gray border-siem-gray-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Network Activity</h3>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Network security monitoring dashboard" 
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Internal Traffic</span>
                  <span className="text-siem-green font-medium">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">External Traffic</span>
                  <span className="text-siem-blue-light font-medium">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Blocked Attempts</span>
                  <span className="text-siem-red font-medium">124</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
      }
      
