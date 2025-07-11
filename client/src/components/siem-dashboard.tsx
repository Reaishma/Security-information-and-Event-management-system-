import { useState, useEffect } from "react";
import { Shield, Clock, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRadarTab from "./qradar-tab";
import SplunkTab from "./splunk-tab";
import ElkTab from "./elk-tab";
import WiresharkTab from "./wireshark-tab";
import AlienVaultTab from "./alienvault-tab";
import { useWebSocket } from "@/hooks/use-websocket";

export default function SiemDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isConnected } = useWebSocket();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  };

  return (
    <div className="min-h-screen bg-siem-dark text-white">
      {/* Header */}
      <header className="bg-siem-gray border-b border-siem-gray-light px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="text-siem-blue-light text-2xl" />
            <h1 className="text-xl font-bold">SIEM Security Operations Center</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-siem-green' : 'bg-siem-red'}`}></div>
              <span className="text-sm text-gray-300">
                {isConnected ? 'Live Monitoring' : 'Disconnected'}
              </span>
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Tabs defaultValue="qradar" className="w-full">
        <div className="bg-siem-gray border-b border-siem-gray-light">
          <TabsList className="bg-transparent border-none p-0 h-auto">
            <div className="flex space-x-1 px-6">
              <TabsTrigger 
                value="qradar" 
                className="data-[state=active]:bg-siem-blue-light data-[state=active]:text-white bg-siem-gray-light text-gray-300 px-4 py-3 rounded-t-lg font-medium hover:bg-siem-gray-light hover:text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                IBM QRadar
              </TabsTrigger>
              <TabsTrigger 
                value="splunk"
                className="data-[state=active]:bg-siem-blue-light data-[state=active]:text-white bg-siem-gray-light text-gray-300 px-4 py-3 rounded-t-lg font-medium hover:bg-siem-gray-light hover:text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                Splunk
              </TabsTrigger>
              <TabsTrigger 
                value="elk"
                className="data-[state=active]:bg-siem-blue-light data-[state=active]:text-white bg-siem-gray-light text-gray-300 px-4 py-3 rounded-t-lg font-medium hover:bg-siem-gray-light hover:text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                ELK Stack
              </TabsTrigger>
              <TabsTrigger 
                value="wireshark"
                className="data-[state=active]:bg-siem-blue-light data-[state=active]:text-white bg-siem-gray-light text-gray-300 px-4 py-3 rounded-t-lg font-medium hover:bg-siem-gray-light hover:text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                Wireshark
              </TabsTrigger>
              <TabsTrigger 
                value="alienvault"
                className="data-[state=active]:bg-siem-blue-light data-[state=active]:text-white bg-siem-gray-light text-gray-300 px-4 py-3 rounded-t-lg font-medium hover:bg-siem-gray-light hover:text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                AlienVault
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="qradar" className="m-0">
          <QRadarTab />
        </TabsContent>
        <TabsContent value="splunk" className="m-0">
          <SplunkTab />
        </TabsContent>
        <TabsContent value="elk" className="m-0">
          <ElkTab />
        </TabsContent>
        <TabsContent value="wireshark" className="m-0">
          <WiresharkTab />
        </TabsContent>
        <TabsContent value="alienvault" className="m-0">
          <AlienVaultTab />
        </TabsContent>
      </Tabs>

      {/* Cross-Platform Event Correlation */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-siem-gray p-4 rounded-lg border border-siem-gray-light shadow-lg max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm">Event Correlation</h4>
            <div className="w-2 h-2 bg-siem-green rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs text-gray-400">
            <p>Correlating events across platforms...</p>
            <p>ML Analysis: 94% confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
