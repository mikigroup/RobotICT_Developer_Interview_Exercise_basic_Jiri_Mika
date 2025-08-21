import React, { useState, useEffect } from "react";
import { generateNumberSequence, getNumberText } from "../utils/numberGenerator.js";

export const RobotICTGenerator = () => {
  // Stav pro zadané číslo
  const [inputNumber, setInputNumber] = useState(15);

  // Stav pro rozsah čísel
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);

  // Stav pro dělitele
  const [divisor1, setDivisor1] = useState(3);
  const [divisor2, setDivisor2] = useState(5);

  // Stav pro chybu
  const [error, setError] = useState("");

  // Stav pro vygenerovaná čísla v rozsahu
  const [rangeNumbers, setRangeNumbers] = useState([]);

    // Generování čísel v rozsahu při změně rozsahu
  useEffect(() => {
    try {
      setError("");
      
      // Validace rozsahu
      if (minRange > maxRange) {
        setError("Minimální hodnota nemůže být větší než maximální hodnota");
        setRangeNumbers([]);
        return;
      }
      
      const generated = generateNumberSequence(minRange, maxRange);
      setRangeNumbers(generated);
    } catch (error) {
      setError(error.message);
      setRangeNumbers([]);
    }
  }, [minRange, maxRange]);

  // Funkce pro zpracování změny inputu
  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setInputNumber(value);
  };

  // Funkce pro změnu rozsahu
  const handleMinRangeChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setMinRange(value);
  };

  const handleMaxRangeChange = (e) => {
    const value = parseInt(e.target.value) || 100;
    setMaxRange(value);
  };

  // Funkce pro změnu dělitelů
  const handleDivisor1Change = (e) => {
    const value = parseInt(e.target.value) || 1;
    setDivisor1(value);
  };

  const handleDivisor2Change = (e) => {
    const value = parseInt(e.target.value) || 1;
    setDivisor2(value);
  };

  // Funkce pro stahování souborů
  const downloadAsTxt = () => {
    // Výpočet statistik
    const stats = {
      robot: 0,
      ict: 0,
      robotICT: 0,
      plain: 0
    };

    rangeNumbers.forEach(num => {
      const text = getNumberText(num, divisor1, divisor2);
      if (text === "Robot") stats.robot++;
      else if (text === "ICT") stats.ict++;
      else if (text === "RobotICT") stats.robotICT++;
      else stats.plain++;
    });

    const header = `RobotICT Validator - Rozsah ${minRange}-${maxRange}\n`;
    const header2 = `Dělitelé: ${divisor1} a ${divisor2}\n`;
    const separator = '='.repeat(50) + '\n\n';

    const statistics = `STATISTIKY:\n`;
    const statsContent = `Robot: ${stats.robot}\nICT: ${stats.ict}\nRobotICT: ${stats.robotICT}\nČísla: ${stats.plain}\n\n`;

    const listHeader = `SEZNAM ČÍSEL:\n`;
    const content = rangeNumbers.map(num => {
      const text = getNumberText(num, divisor1, divisor2);
      return `${num}: ${text}`;
    }).join('\n');

    const fullContent = header + header2 + separator + statistics + statsContent + listHeader + content;

    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `robotict_numbers_${minRange}-${maxRange}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsCsv = () => {
    // Výpočet statistik
    const stats = {
      robot: 0,
      ict: 0,
      robotICT: 0,
      plain: 0
    };

    rangeNumbers.forEach(num => {
      const text = getNumberText(num, divisor1, divisor2);
      if (text === "Robot") stats.robot++;
      else if (text === "ICT") stats.ict++;
      else if (text === "RobotICT") stats.robotICT++;
      else stats.plain++;
    });

    // Metadata
    const metadata = [
      `RobotICT Validator - Rozsah ${minRange}-${maxRange}`,
      `Dělitelé: ${divisor1} a ${divisor2}`,
      '',
      'STATISTIKY',
      `Robot,${stats.robot}`,
      `ICT,${stats.ict}`,
      `RobotICT,${stats.robotICT}`,
      `Čísla,${stats.plain}`,
      '',
      'SEZNAM ČÍSEL'
    ].join('\n');

    // Hlavička pro data
    const headers = 'Číslo,Dělitelné 3,Dělitelné 5,Dělitelné oběma,Označení\n';
    const content = rangeNumbers.map(num => {
      const text = getNumberText(num, divisor1, divisor2);
      const divisibleBy3 = num % divisor1 === 0 ? 'Ano' : 'Ne';
      const divisibleBy5 = num % divisor2 === 0 ? 'Ano' : 'Ne';
      const divisibleByBoth = (num % divisor1 === 0 && num % divisor2 === 0) ? 'Ano' : 'Ne';
      return `${num},${divisibleBy3},${divisibleBy5},${divisibleByBoth},${text}`;
    }).join('\n');

    const csvContent = metadata + '\n' + headers + content;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `robotict_numbers_${minRange}-${maxRange}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto gap-8 flex flex-col">
        {/* Hlavní nadpis */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🤖 RobotICT Validator - FizzBuzz Pro
          </h1>
          <p className="text-gray-600">
            Aplikace ověřuje čísla na základě pravidel dělitelnosti a vrací odpovídající výsledek
          </p>
        </div>

        {/* Input sekce */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Číslo pro testování */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zadejte číslo ({minRange} až {maxRange}):
              </label>
              <input
                type="number"
                value={inputNumber}
                onChange={handleNumberChange}
                min={minRange}
                max={maxRange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={`Zadejte číslo od ${minRange} do ${maxRange}`}
              />
              {inputNumber < minRange && inputNumber > 0 && (
                <p className="text-red-500 text-sm mt-1">Číslo musí být alespoň {minRange}</p>
              )}
              {inputNumber > maxRange && (
                <p className="text-red-500 text-sm mt-1">Číslo nemůže být větší než {maxRange}</p>
              )}
            </div>



            {/* Dělitelé */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Dělitelé
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  První dělitel:
                </label>
                <input
                  type="number"
                  value={divisor1}
                  onChange={handleDivisor1Change}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Např. 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Druhý dělitel:
                </label>
                <input
                  type="number"
                  value={divisor2}
                  onChange={handleDivisor2Change}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Např. 5"
                />
              </div>
            </div>

            <hr />

            {/* Rozsah čísel */}

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Rozsah čísel
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Od čísla:
                </label>
                <input
                  type="number"
                  value={minRange}
                  onChange={handleMinRangeChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Např. 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do čísla:
                </label>
                <input
                  type="number"
                  value={maxRange}
                  onChange={handleMaxRangeChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Např. 100"
                />
              </div>
            </div>


            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Výsledky */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Rozhodnutí
          </h3>

          {inputNumber >= minRange && inputNumber <= maxRange && (
            <div className="flex justify-center p-4 border border-gray-200 rounded-lg">
              {(() => {
                const text = getNumberText(inputNumber, divisor1, divisor2);
                const isRobot = text === "Robot";
                const isICT = text === "ICT";
                const isRobotICT = text === "RobotICT";

                return (
                  <div
                    className={`
                      px-6 py-4 text-center rounded-lg text-lg font-bold transition-all
                      ${isRobotICT
                        ? "bg-red-500 text-white shadow-md"
                        : isRobot
                          ? "bg-teal-400 text-white"
                          : isICT
                            ? "bg-blue-400 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {text}
                  </div>
                );
              })()}
            </div>
          )}

          {(inputNumber < minRange || inputNumber > maxRange) && (
            <div className="text-center py-8 text-gray-500">
              Zadejte číslo v rozsahu {minRange} až {maxRange}
            </div>
          )}
        </div>

        {/* Statistiky */}
        {rangeNumbers.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📊 Statistiky rozsahu ({minRange} - {maxRange})
            </h3>

            {(() => {
              const stats = {
                robot: 0,
                ict: 0,
                robotICT: 0,
                plain: 0
              };

              rangeNumbers.forEach(num => {
                const text = getNumberText(num, divisor1, divisor2);
                if (text === "Robot") stats.robot++;
                else if (text === "ICT") stats.ict++;
                else if (text === "RobotICT") stats.robotICT++;
                else stats.plain++;
              });

              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-teal-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-teal-600">{stats.robot}</div>
                    <div className="text-sm text-teal-700">Robot</div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.ict}</div>
                    <div className="text-sm text-blue-700">ICT</div>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.robotICT}</div>
                    <div className="text-sm text-red-700">RobotICT</div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-600">{stats.plain}</div>
                    <div className="text-sm text-gray-700">Čísla</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Stahování souborů */}
        {rangeNumbers.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📥 Stáhnout seznam čísel
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadAsTxt}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>📄</span>
                Stáhnout jako .txt
              </button>

              <button
                onClick={downloadAsCsv}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>📊</span>
                Stáhnout jako .csv
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-3 text-center">
              Soubor bude obsahovat {rangeNumbers.length} čísel s jejich označeními
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
