import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export default function ElkTab() {
  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/dashboard-stats"],
    refetchInterval: 5000,
  });

  const elasticsearchQuery = `GET /logstash-*/_search
{
  "query": {
    "range": {
      "@timestamp": {
        "gte": "now-1h"
      }
    }
  }
}`;

  return (
    <div className="p-6 bg-siem-dark">
      {/* ELK Stack Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Elasticsearch Query */}
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Elasticsearch Query</h3>
            <div className="bg-siem-dark p-4 rounded border border-siem-gray-light">
              <pre className="text-sm text-siem-green font-mono whitespace-pre-wrap">
                {elasticsearchQuery}
              </pre>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>Hits: {stats?.totalEvents || 0} | Took: 124ms</p>
            </div>
          </CardContent>
        </Card>

        {/* Kibana Visualization */}
        <Card className="bg-siem-gray border-siem-gray-light">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Kibana Visualization</h3>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
              alt="Data analytics dashboard with security charts" 
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-siem-blue-light">98.7%</p>
                <p className="text-xs text-gray-400">Index Health</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-siem-green">1.2TB</p>
                <p className="text-xs text-gray-400">Data Stored</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logstash Pipeline */}
      <Card className="bg-siem-gray border-siem-gray-light">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Logstash Pipeline Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-green mb-2">Input</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Beats</span>
                    <span className="text-siem-green">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Syslog</span>
                    <span className="text-siem-green">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>HTTP</span>
                    <span className="text-siem-amber">Warning</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-blue-light mb-2">Filter</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grok</span>
                    <span className="text-siem-green">Processing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Mutate</span>
                    <span className="text-siem-green">Processing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GeoIP</span>
                    <span className="text-siem-green">Processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-siem-dark border-siem-gray-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-siem-purple mb-2">Output</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Elasticsearch</span>
                    <span className="text-siem-green">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Kafka</span>
                    <span className="text-siem-green">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>File</span>
                    <span className="text-siem-green">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
