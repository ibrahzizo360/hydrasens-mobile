import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from 'cloudinary-react-native';
import * as ImageManipulator from 'expo-image-manipulator';


const resizeImage = async (uri: string) => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // adjust width; height will be scaled proportionally
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  };
  
export const cld = new Cloudinary({
    cloud: {
        cloudName: 'zizo-dev'
    },
    url: {
        secure: true
    }
});

const options = {
    upload_preset: 'hydrasens',
    unsigned: true,
}

export const uploadImageToCloudinary = async (file: any) => {
    const resizedUri = await resizeImage(file);
  
    // Use a Promise to handle the asynchronous callback
    return new Promise((resolve, reject) => {
        upload(cld, {
            file: resizedUri, // Use the resized image URI
            options: options,
            callback: (error: any, response: any) => {
                if (error) {
                    console.log('Error uploading image:', error);
                    reject(error); // Reject the promise on error
                } else {
                    console.log('Upload successful:', response.url);
                    resolve(response.url);
                }
            }
        });
    });
};


  