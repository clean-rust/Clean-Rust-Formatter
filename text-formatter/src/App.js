import React, { useState } from 'react';

function RustTextGenerator() {
  const [text, setText] = useState('');
  const [code, setCode] = useState('');

  const updateCode = (newText) => {
    const formattedCode = newText
      .replace(/\n/g, '\\n')
      .replace(/<color=(.*?)>(.*?)<\/color>/g, '<color=$1>$2</color>');
    setCode(formattedCode);
    setText(newText);
  };

  const updateText = (newCode) => {
    const formattedText = newCode
      .replace(/\\n/g, '\n')
      .replace(/<color=(.*?)>(.*?)<\/color>/g, (_, color, content) => {
        return `<color=${color}>${content}</color>`;
      });
    setText(formattedText);
    setCode(newCode);
  };

  const createMarkup = () => {
    const parsedText = text.replace(
      /<color=(.*?)>(.*?)<\/color>/g,
      (_, color, content) => {
        return `<span style="color:${color}">${content}</span>`;
      }
    );
    return { __html: parsedText };
  };

  return (
    <div style={{ display: 'flex', padding: '20px', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ flex: 1, paddingRight: '10px' }}>
        <div>
          <h2>Text</h2>
          <textarea
            rows="30"
            cols="100"
            value={text}
            onChange={(e) => updateCode(e.target.value)}
          />
        </div>
        <div>
          <h2>Code</h2>
          <textarea
            rows="20"
            cols="100"
            value={code}
            onChange={(e) => updateText(e.target.value)}
          />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Preview</h2>
        <div
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            whiteSpace: 'pre-wrap',
            fontSize: '30px',
            color: 'white',
            backgroundImage: 'url(https://px2.live/clean/2023/Screenshot%202023-09-04%20154434.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textShadow: '2px 2px 2px black',
          }}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </div>
  );
}


export default RustTextGenerator;
