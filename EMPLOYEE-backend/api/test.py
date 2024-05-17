from pymongo import MongoClient
import ssl

try:
    print("Connecting to MongoDB...")
    client = MongoClient(
        'mongodb+srv://admin:priya@cluster0.l6dotpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        tls=True,
        tlsAllowInvalidCertificates=True
    )
    db = client['employeee']
    print("Connected to MongoDB")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
