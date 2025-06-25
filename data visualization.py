import pandas as pd
import plotly.express as px
import numpy as np

Load the data
np.random.seed(0)
logs = pd.DataFrame({
    'timestamp': pd.date_range(start='2022-01-01', periods=100),
    'log_level': np.random.choice(['INFO', 'WARNING', 'ERROR'], size=100),
    'log_message': np.random.choice(['Login successful', 'Unusual activity detected', 'System failure'], size=100)
})

events = pd.DataFrame({
    'timestamp': pd.date_range(start='2022-01-01', periods=100),
    'event_type': np.random.choice(['login', 'file_access', 'system_failure'], size=100)
})

alerts = pd.DataFrame({
    'timestamp': pd.date_range(start='2022-01-01', periods=50),
    'alert_level': np.random.choice(['LOW', 'MEDIUM', 'HIGH'], size=50)
})

Create a log level distribution pie chart
log_level_fig = px.pie(logs, names='log_level', title='Log Level Distribution')

Create an event type distribution heatmap
event_type_counts = events['event_type'].value_counts().reset_index()
event_type_counts.columns = ['event_type', 'count']
event_type_fig = px.imshow([event_type_counts['count']], text_auto=True, aspect='auto', title='Event Type Distribution')

Create an alert level distribution line chart
alert_level_counts = alerts['alert_level'].value_counts().reset_index()
alert_level_counts.columns = ['alert_level', 'count']
alert_level_fig = px.line(alert_level_counts, x='alert_level', y='count', title='Alert Level Distribution')

Create a line chart for log levels over time
log_level_counts = logs.groupby('timestamp')['log_level'].count().reset_index()
log_level_counts.columns = ['timestamp', 'count']
log_level_over_time_fig = px.line(log_level_counts, x='timestamp', y='count', title='Log Levels Over Time')

Show the plots
log_level_fig.show()
event_type_fig.show()
alert_level_fig.show()
log_level_over_time_fig.show()
