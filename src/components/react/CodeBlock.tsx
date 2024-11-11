import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';

// Definimos los tipos para las props
interface CodeBlockProps {
  code: string;
  language?: ProgrammingLanguage;
}

// Definimos los lenguajes de programación soportados
type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'jsx'
  | 'tsx'
  | 'css'
  | 'html'
  | 'json';

// Componentes de íconos tipados
const CopyIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);


const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language: initialLanguage = 'javascript'
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [language] = useState<ProgrammingLanguage>(initialLanguage);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  return (
    <div className="relative rounded-md bg-gray-950 overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <p
          className="bg-transparent text-sm focus:outline-none focus:ring-0 border-none"
        >
          {language}
        </p>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
          aria-label={copied ? "Código copiado" : "Copiar código"}
        >
          {copied ? (
            <>
              <CheckIcon />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>Copiar código</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto">
        <pre className="!bg-transparent">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;