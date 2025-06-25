import pandas as pd

Sample data for test cases
test_cases = [
    {"timestamp": "2025-06-22 14:15:15", "src_ip": "192.168.1.100", "dst_ip": "192.168.1.200", "protocol": "TCP", "event_type": "valid_login"},
    {"timestamp": "2025-06-22 14:15:16", "src_ip": "192.168.1.101", "dst_ip": "192.168.1.200", "protocol": "TCP", "event_type": "invalid_login"},
    {"timestamp": "2025-06-22 14:15:17", "src_ip": "192.168.1.102", "dst_ip": "192.168.1.200", "protocol": "UDP", "event_type": "suspicious_activity"}
]

Function to simulate SIEM system alert generation
def generate_alert(event):
    if event["event_type"] == "invalid_login" or event["event_type"] == "suspicious_activity":
        return True
    else:
        return False

Run test cases and validate results
for test_case in test_cases:
    alert_generated = generate_alert(test_case)
    if test_case["event_type"] == "valid_login" and not alert_generated:
        print(f"Test Case {test_cases.index(test_case) + 1}: Valid Login - PASS")
    elif test_case["event_type"] == "invalid_login" and alert_generated:
        print(f"Test Case {test_cases.index(test_case) + 1}: Invalid Login - PASS")
    elif test_case["event_type"] == "suspicious_activity" and alert_generated:
        print(f"Test Case {test_cases.index(test_case) + 1}: Suspicious Activity - PASS")
    else:
        print(f"Test Case {test_cases.index(test_case) + 1}: FAIL")

This code simulates the test cases and validates the SIEM system's alert generation functionality.
