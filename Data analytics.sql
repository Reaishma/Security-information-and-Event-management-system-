CREATE TABLE logs (
  log_id INT AUTO_INCREMENT,
  timestamp DATETIME,
  log_level VARCHAR(10),
  log_message TEXT,
  source_ip VARCHAR(45),
  destination_ip VARCHAR(45),
  PRIMARY KEY (log_id)
);

CREATE TABLE events (
  event_id INT AUTO_INCREMENT,
  timestamp DATETIME,
  event_type VARCHAR(50),
  event_description TEXT,
  user_id INT,
  PRIMARY KEY (event_id)
);

CREATE TABLE alerts (
  alert_id INT AUTO_INCREMENT,
  timestamp DATETIME,
  alert_level VARCHAR(10),
  alert_description TEXT,
  event_id INT,
  PRIMARY KEY (alert_id)
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(255),
  role VARCHAR(50),
  PRIMARY KEY (user_id)
);
INSERT INTO logs (timestamp, log_level, log_message, source_ip, destination_ip)
VALUES
  ('2022-01-01 12:00:00', 'INFO', 'Login successful', '192.168.1.100', '192.168.1.200'),
  ('2022-01-01 12:05:00', 'WARNING', 'Unusual activity detected', '192.168.1.101', '192.168.1.201'),
  ('2022-01-01 12:10:00', 'ERROR', 'System failure', '192.168.1.102', '192.168.1.202');

INSERT INTO events (timestamp, event_type, event_description, user_id)
VALUES
  ('2022-01-01 12:00:00', 'login', 'User logged in', 1),
  ('2022-01-01 12:05:00', 'file_access', 'User accessed sensitive file', 2),
  ('2022-01-01 12:10:00', 'system_failure', 'System failure occurred', 1);

INSERT INTO alerts (timestamp, alert_level, alert_description, event_id)
VALUES
  ('2022-01-01 12:05:00', 'MEDIUM', 'Unusual activity detected', 2),
  ('2022-01-01 12:10:00', 'HIGH', 'System failure occurred', 3);

INSERT INTO users (username, password, role)
VALUES
  ('admin', 'password123', 'admin'),
  ('analyst', 'password456', 'analyst');
-- Log analysis
SELECT log_level, COUNT(*) AS count FROM logs GROUP BY log_level;
SELECT source_ip, COUNT(*) AS count FROM logs GROUP BY source_ip;

-- Event analysis
SELECT event_type, COUNT(*) AS count FROM events GROUP BY event_type;
SELECT user_id, COUNT(*) AS count FROM events GROUP BY user_id;

-- Alert analysis
SELECT alert_level, COUNT(*) AS count FROM alerts GROUP BY alert_level;
SELECT event_id, COUNT(*) AS count FROM alerts GROUP BY event_id;
