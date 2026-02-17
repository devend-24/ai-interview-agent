"use client";

import { useState } from "react";

const BOILERPLATES = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
`,
  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here
        
    }
}
`,
  python: `def main():
    # Write your code here
    pass


if __name__ == "__main__":
    main()
`
};

export default function CodingQuestion({ onSubmit }) {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(BOILERPLATES.cpp);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(BOILERPLATES[lang]);
  };

  const handleClear = () => {
    setShowClearModal(true);
  };

  const confirmClear = () => {
    setCode(BOILERPLATES[language]);
    setShowClearModal(false);
  };

  const handleSubmit = () => {
    if (!code.trim()) return;

    // 🔥 ONLY send raw data upward
    onSubmit({
      language,
      code,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      
      const { selectionStart, selectionEnd } = e.target;
      const newCode = 
        code.substring(0, selectionStart) + 
        "    " +  // 4 spaces (or use "\t" for tab character)
        code.substring(selectionEnd);
      
      setCode(newCode);
      
      // Restore cursor position after state update
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
      }, 0);
    }
  };

   return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4 border rounded-xl shadow-sm dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">💻 Code Editor</h2>

        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-3 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="w-full h-96 p-3 font-mono text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-950 dark:border-zinc-800"
      />

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Lines: {code.split('\n').length} | Characters: {code.length}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium border rounded-md dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Clear Code 🧹
          </button>

          
        {showClearModal && (
            <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-sm w-[200px] mx-4 shadow-xl">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Reset Code?</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Do you want to discard all changes? (Set to default boilerplate)
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowClearModal(false)}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmClear}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:text-white cursor-pointer"
                  >
                    Reset Code
                  </button>
                </div>
              </div>
            </div>
          )}









          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit Code 🚀
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Tip:</strong> Write your solution above and click Submit to get AI feedback on correctness, efficiency, and style.
        </p>
      </div>
    </div>

    
    
    
  );

}
