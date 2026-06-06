import os
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("db")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DATABASE_NAME = "inventory"

_client = None
_db = None
_is_mock = False

try:
    logger.info(f"Attempting to connect to MongoDB at {MONGO_URI}...")
    # Set serverSelectionTimeoutMS to 2000 (2 seconds) to fail quickly if offline
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
    client.admin.command('ismaster')
    _client = client
    _db = client[DATABASE_NAME]
    logger.info("Successfully connected to MongoDB!")
except (ConnectionFailure, ServerSelectionTimeoutError) as e:
    logger.warning(f"Could not connect to MongoDB: {e}. Falling back to mongomock...")
    import mongomock
    _client = mongomock.MongoClient()
    _db = _client[DATABASE_NAME]
    _is_mock = True
    logger.info("Mock MongoDB initialized successfully.")


def get_db():
    yield _db
