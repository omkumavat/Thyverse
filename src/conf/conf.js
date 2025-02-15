const conf = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteDbId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteCollectionUsersId : String(import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;