import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

export default function WiresharkTab() {
  const [isCapturing, setIsCapturing] = useState(false);

  const { data: networkTraffic } = useQuery({
    queryKey: ["/api/network-traffic"],
    queryFn: () => fetch("/api/network-traffic?limit=10").then(res => res.json()),
    refetchInterval: 2000,
  });

  const protocolStats = networkTraffic?.reduce((acc: any, packet: any) => {
    acc[packet.protocol] = (acc[packet.protocol] || 0) + 1;
    return acc;
  }, {}) || {};

  const totalPackets = networkTraffic?.length || 0;
  const protocolDistribution = Object.entries(protocolStats).map(([protocol, count]) => ({
    protocol,
    count: count as number,
    percentage: totalPackets > 0 ? Math.round((count as number / totalPackets) * 100) : 0
  }));

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="p-6 bg-siem-dark">
      {/* Wireshark Capture Interface */}
      <Card className="bg-siem-gray border-siem-gray-light mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Network Packet Analysis</h3>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsCapturing(true)}
                disabled={isCapturing}
                className="bg-siem-green hover:bg-green-600 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Capture
              </Button>
              <Button
                onClick={() => setIsCapturing(false)}
                disabled={!isCapturing}
                className="bg-siem-red hover:bg-red-600 text-white"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>
          
          {/* Network Traffic Visualization */}
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
              alt="Network traffic analysis interface" 
              className="w-full h-48 object-cover rounded mb-4"
            />
          </div>

          {/* Packet Details */}
          <Card className="bg-siem-dark border-siem-gray-light">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Live Packet Capture</h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="grid grid-cols-6 gap-4 text-xs text-gray-400 pb-2 border-b border-siem-gray-light">
                  <span>Time</span>
                  <span>Source</span>
                  <span>Destination</span>
                  <span>Protocol</span>
                  <span>Length</span>
                  <span>Info</span>
                </div>
                {networkTraffic?.slice(0, 5).map((packet: any) => (
                  <div key={packet.id} className="grid grid-cols-6 gap-4 text-xs">
                    <span className="text-siem-green">{formatTime(packet.timestamp)}</span>
                    <span className="truncate">{packet.sourceIp}</span>
                    <span className="truncate">{packet.destinationIp}</span>
                    <span className="text-siem-blue-light">{packet.protocol}</span>
                    <span>{packet.packetSize || 'N/A'}</span>
                    <span className="truncate">{packet.payload || 'Standard packet'}</span>
                  </div>
                ))}
                {!networkTraffic?.length && (
                  <div className="text-center py-4 text-gray-400">
                    No network traffic captured
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Protocol Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Protocol Distribution</h3>
            <div className="space-y-3">
              {protocolDistribution.slice(0, 5).map(({ protocol, percentage }) => (
                <div key={protocol} className="flex items-center justify-between">
                  <span className="text-sm">{protocol}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-siem-dark rounded-full h-2">
                      <div 
                        className="bg-siem-blue-light h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-siem-blue-light">{percentage}%</span>
                  </div>
                </div>
              ))}
              {protocolDistribution.length === 0 && (
                <div className="text-center text-gray-400">No protocol data available</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-siem-blue-light">{totalPackets}</p>
                <p className="text-xs text-gray-400">Packets Captured</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-siem-green">89.4MB</p>
                <p className="text-xs text-gray-400">Bandwidth</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-siem-red">
                  {networkTraffic?.filter((p: any) => p.protocol === 'TCP' && p.flags?.includes('SYN')).length || 0}
                </p>
                <p className="text-xs text-gray-400">Anomalies</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-siem-amber">3.2ms</p>
                <p className="text-xs text-gray-400">Avg Latency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
            }
                                          
