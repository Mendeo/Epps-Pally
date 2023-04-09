'use strict';
const fs = require('fs');
const data = readFileToArray('data.txt');

console.log(T_EP(data));

function readFileToArray(path)
{
	return fs.readFileSync(path).toString().split('\r\n').filter((value) => value !== '').map((value) => Number(value)).filter((value) => !isNaN(value));
}

function T_EP(data)
{
	const dataMoments = getMoments(data);
	const A = getA(data, dataMoments);
	const B = getB(data, dataMoments);

	return 1 + data.length / Math.sqrt(3) + B - A;

	function getA(data, dataMoments)
	{
		const sum = data.reduce((pv, cv) => pv + Math.exp(-((cv - dataMoments.avg) ** 2) / (4 * dataMoments.m2)), 0);
		return sum * Math.SQRT2;
	}

	function getB(data, dataMoments)
	{
		let sum1 = 0;
		for (let k = 1; k < data.length; k++)
		{
			let sum2 = 0;
			for (let i = 0; i < k; i++)
			{
				sum2 += Math.exp(-((data[i] - data[k]) ** 2) / (2 * dataMoments.m2));
			}
			sum1 += sum2;
		}
		return (2 / data.length) * sum1;
	}

	function getMoments(data)
	{
		const avg = getAverage(data);
		const m2 = data.reduce((pv, cv) => pv + (cv - avg) ** 2.0, 0) / data.length;
		return {
			avg,
			m2
		};

		function getAverage(data)
		{
			const sum = data.reduce((pv, cv) => pv + cv, 0);
			return sum / data.length;
		}
	}
}
