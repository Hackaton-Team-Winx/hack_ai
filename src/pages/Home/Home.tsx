import { useTranslation, Trans } from 'react-i18next';
import React from 'react';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

import Logo from 'components/Logo';

function Home() {
    const { t } = useTranslation();
    const { useState } = React;
    const [selectedFile, setSelectedFile] = useState();
    const [checkFile, setCheckFile] = useState(false);
    const configuration = new Configuration({
        apiKey: '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'
    });
    const openai = new OpenAIApi(configuration);

    const imageHandler = (e: any) => {
        setSelectedFile(e.target.files[0]);
        setCheckFile(true);
    };
    const imagesubmission = () => {
        const imageUrl = document.getElementById(
            'InputURL'
        ) as HTMLInputElement;
        const textArea = document.getElementById(
            'trascriptText'
        ) as HTMLInputElement;
        if (checkFile) {
            /*  const imageSrc = imageInput.src;
            const transcription = handleImageTranscription(imageSrc);
            console.log('Transcrição:', transcription);
            const file = imageInput;
            const reader = new FileReader();

            imageInput.onload = async () => {
                const transcription = await handleImageTranscription(imageSrc);
                console.log('Transcrição:', transcription);
            };

           reader.onload = async () => {
                const imageSrc = reader.result as string;
                const transcription = await handleImageTranscription(imageSrc);
                console.log('Transcrição:', transcription);
            };*/
            alert(selectedFile);
        } else {
            const url =
                'https://secure-backend-api.stilingue.com.br/blip-nlu-hack-ai/prod/hack-ai/completions';
            const data = {
                deployment: 'text-davinci-003',
                prompt:
                    'Gere um texto alternativo para a imagem dessa url: ' +
                    imageUrl.value,
                temperature: 0.3,
                top_p: 0.95,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 200,
                stop: null
            };

            axios
                .post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'hack-ai-team-name': 'winx',
                        'hack-ai-api-key': '00CfZP1MDp4c7x9owA-7XQ'
                    }
                })
                .then((response) => {
                    //alert();
                    textArea.innerHTML = response.data.choices[0].text.trim();
                })
                .catch((error) => {
                    alert('Eror:' + error);
                });
        }
    };

    return (
        <div className="flex h-full flex-col items-center justify-center py-24 text-neutral-dark-city">
            <div className="mt-4">
                <p className="text-center">
                    {t('paragraph.homeDescription.part1')}
                </p>
                <div className="relative overflow-x-auto">
                    <div className="... columns-3">
                        <div className="relative mt-4">
                            <label
                                title="Click to upload"
                                htmlFor="button2"
                                className="dark:before:bg-darker group flex cursor-pointer items-center gap-4 px-6 py-4 before:absolute before:inset-0 before:rounded-3xl  before:border-gray-400/60 before:bg-gray-100 before:transition-transform before:duration-300 hover:before:scale-105 hover:before:border-gray-300 active:duration-75 active:before:scale-95 dark:before:border-gray-600 dark:hover:before:border-gray-500"
                            >
                                <div className="relative w-max">
                                    <img
                                        className="w-12"
                                        src="https://www.svgrepo.com/show/507878/upload.svg"
                                        alt="file upload icon"
                                        width="512"
                                        height="512"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="relative block text-base font-semibold text-blue-900 group-hover:text-blue-500 dark:text-white">
                                        Faça o upload da sua imagem aqui
                                    </span>
                                    <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                                        Apenas imagens em .jpg ou .png com até
                                        10mb
                                    </span>
                                </div>
                            </label>
                            <input
                                type="file"
                                name="button2"
                                onChange={imageHandler}
                                id="button2"
                                accept=".gif,.jpg,.jpeg,.png"
                            />
                            <div className="absolute flex items-center justify-center gap-2">
                                <img
                                    className={`h-10 w-10 rounded-full ${
                                        checkFile ? 'opacity-1' : 'opacity-0'
                                    }`}
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : null!
                                    }
                                />
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <img
                                id="imageInput"
                                alt="previsão da imagem"
                                className="img-preview sticky h-full w-full bg-fixed object-cover"
                            />
                        </div>
                        <p>
                            <div className=" relative mt-4">
                                <input
                                    type="url"
                                    className="peer-focus:text-primary dark:peer-focus:text-primary peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="InputURL"
                                    placeholder="Example label"
                                />
                                <label
                                    htmlFor="FormControlInputURL"
                                    className="peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200"
                                >
                                    URL da imagem
                                </label>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <button
                id="uploadButton"
                onClick={imagesubmission}
                className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Transcrever imagem
            </button>
            <textarea
                id="trascriptText"
                className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-relaxed text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="A transcrição da imagem irá aparecer aqui..."
            ></textarea>
        </div>
    );
}

export default Home;
