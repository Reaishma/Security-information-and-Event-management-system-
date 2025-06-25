notifications = []

def send_notification(message, priority="low"):
    notifications.append({"message": message, "priority": priority})
    print("Notification added:", message)

def view_notifications():
    if not notifications:
        print("No notifications.")
    else:
        print("Notifications:")
        for i, notification in enumerate(notifications):
            print(f"{i+1}. {notification['message']} ({notification['priority']})")

def dismiss_notification(index):
    try:
        index = int(index) - 1
        if index < 0 or index >= len(notifications):
            print("Invalid notification index.")
        else:
            del notifications[index]
            print("Notification dismissed.")
    except ValueError:
        print("Invalid input.")

def main():
    while True:
        print("\nNotification System")
        print("1. Send notification")
        print("2. View notifications")
        print("3. Dismiss notification")
        print("4. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == "1":
            message = input("Enter notification message: ")
            priority = input("Enter priority (low, medium, high): ")
            send_notification(message, priority)
        elif choice == "2":
            view_notifications()
        elif choice == "3":
            view_notifications()
            index = input("Enter notification number to dismiss: ")
            dismiss_notification(index)
        elif choice == "4":
            break
        else:
            print("Invalid option.")

if __name__ == "__main__":
    main()
