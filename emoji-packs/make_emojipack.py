"""
A tool to create an emojipack
by stealing emojis from server.
Please replace pack name and author
with actual values before submiting.
"""

import websocket
import json

token = input("Paste your token: ")
server = input("Paste server id: ")
server_emojis = []


def on_open(ws):
    print("connected")
    ws.send(json.dumps({
        "type": "Authenticate",
        "token": token
    }))

def on_message(ws, message):
    event = json.loads(message)
    if event["type"] != "Ready": return
    print("Ready")

    print(json.dumps({
        "name": "Emoji pack name",
        "publisher": "Username",
        "emojis": {
            emoji["_id"]: { "name": emoji["name"] }
            for emoji in event["emojis"]
            if emoji["parent"] == {
                "type": "Server",
                "id": server
            }
        }
    }, indent=1))
    
    ws.close()
    exit(0)

if __name__ == "__main__":
    print("connecting")
    # Create a WebSocket application
    ws = websocket.WebSocketApp("wss://app.revolt.chat/events",
                                on_open=on_open,
                                on_message=on_message)

    # Run the WebSocket application
    ws.run_forever()
