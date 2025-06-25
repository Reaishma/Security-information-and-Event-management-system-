from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Sample data
data = {
    'Timestamp': ['2025-06-22 14:15:15', '2025-06-22 14:15:16', '2025-06-22 14:15:17', '2025-06-22 14:15:18', '2025-06-22 14:15:19', 
                  '2025-06-22 14:15:20', '2025-06-22 14:15:21', '2025-06-22 14:15:22', '2025-06-22 14:15:23', '2025-06-22 14:15:24'],
    'Src IP': ['192.168.1.100', '192.168.1.101', '192.168.1.102', '192.168.1.103', '192.168.1.104', 
               '192.168.1.100', '192.168.1.101', '192.168.1.102', '192.168.1.103', '192.168.1.105'],
    'Dst IP': ['192.168.1.200', '192.168.1.200', '192.168.1.200', '192.168.1.200', '192.168.1.200', 
               '192.168.1.200', '192.168.1.200', '192.168.1.200', '192.168.1.200', '192.168.1.200'],
    'Protocol': ['TCP', 'TCP', 'UDP', 'TCP', 'ICMP', 'TCP', 'TCP', 'UDP', 'TCP', 'ICMP'],
    'Event Type': ['Login', 'Login', 'DNS Query', 'File Transfer', 'Ping', 'Login', 'Login', 'DNS Query', 'File Transfer', 'Ping'],
    'Label': [1, 1, 1, 1, -1, 1, 1, 1, 1, -1]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Encode categorical variables
le_protocol = LabelEncoder()
le_event_type = LabelEncoder()
le_src_ip = LabelEncoder()
le_dst_ip = LabelEncoder()

df['Protocol'] = le_protocol.fit_transform(df['Protocol'])
df['Event Type'] = le_event_type.fit_transform(df['Event Type'])
df['Src IP'] = le_src_ip.fit_transform(df['Src IP'])
df['Dst IP'] = le_dst_ip.fit_transform(df['Dst IP'])

# Select features and labels
X = df[['Protocol', 'Event Type', 'Src IP', 'Dst IP']]
y = df['Label']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create an Isolation Forest model
model = IsolationForest(contamination=0.2)

# Fit the model to the training data
model.fit(X_train)

# Predict anomalies on the test data
y_pred = model.predict(X_test)

# Map predictions to match the label encoding
y_pred = [1 if x == 1 else -1 for x in y_pred]

# Evaluate the model
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
