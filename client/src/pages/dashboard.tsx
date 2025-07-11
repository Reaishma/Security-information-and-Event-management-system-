import { useEffect } from "react";
import SiemDashboard from "@/components/siem-dashboard";

export default function Dashboard() {
  useEffect(() => {
    document.title = "SIEM Security Operations Center";
  }, []);

  return (
    <div className="min-h-screen bg-siem-dark">
      <SiemDashboard />
    </div>
  );
}
