'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '@/components/ui/edgestore/multi-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

export function MultiImageDropzoneUsage({setUploadResponses }: { setUploadResponses: any }) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div className='w-full'>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 5,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          const responses = await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file as File,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                return res; // Return the response
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
                return null; // Return null if there's an error
              }
            }),
          );
          // Filter out null responses and update the state with new responses
          setUploadResponses((prevResponses: any) => {
            const updatedResponses = [
              ...prevResponses,
              ...responses.filter((res) => res !== null),
            ];
            // console.log(updatedResponses); // Log the array of all responses
            return updatedResponses;
          });
        }}
      />
    </div>
  );
}
