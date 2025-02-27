import { useEffect, useState } from "react";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import Tflite from "react-native-tflite";

const useTFLiteModel = () => {
  const [tflite, setTflite] = useState(null);

  useEffect(() => {
    async function loadModel() {
      await tf.ready();
      let tfliteModel = new Tflite();
      tfliteModel.loadModel(
        {
          model: "assets/model/ct_vgg_best_model.tflite",
          labels: [], // Pas besoin si c'est un modèle de classification binaire
        },
        (err, res) => {
          if (err) console.log("Erreur chargement modèle : ", err);
          else console.log("Modèle chargé !");
        }
      );
      setTflite(tfliteModel);
    }

    loadModel();
  }, []);

  const classifyImage = async (imageUri) => {
    if (!tflite) return "Modèle non chargé";

    const manipulatedImage = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 224, height: 224 } }], {
      format: ImageManipulator.SaveFormat.JPEG,
    });

    const imgB64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return new Promise((resolve, reject) => {
      tflite.runModelOnImage(
        {
          path: `data:image/jpeg;base64,${imgB64}`,
          imageMean: 0,
          imageStd: 255,
          numResults: 1,
          threshold: 0.5,
        },
        (err, res) => {
          if (err) reject(err);
          else resolve(res[0]?.confidence > 0.5 ? "Tumeur détectée" : "Aucune tumeur");
        }
      );
    });
  };

  return { classifyImage };
};

export default useTFLiteModel;
