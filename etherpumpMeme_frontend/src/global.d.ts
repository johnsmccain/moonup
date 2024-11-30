declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: object,
        callback: (error: any, result: any) => void
      ) => any;
    };
  }
}

export {};
