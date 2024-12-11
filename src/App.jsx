import axios from "axios";
import { useEffect, useState } from "react";
import {
	BsCloudDrizzleFill,
	BsCloudHaze2Fill,
	BsEye,
	BsThermometer,
	BsWater,
	BsWind,
} from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import {
	IoMdCloudy,
	IoMdRainy,
	IoMdSearch,
	IoMdSnow,
	IoMdSunny,
	IoMdThunderstorm,
} from "react-icons/io";
import { TbTemperatureCelsius } from "react-icons/tb";
import bg from "./assets/img/bg.png";
function App() {
	const [data, setData] = useState(null);
	const [location, setLocation] = useState("Hanoi");
	const [inputValue, setInputValue] = useState("");
	const [animate, setAnimate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleInput = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue !== "") {
			setLocation(inputValue);
		}

		const input = document.querySelector("input");
		if (input.value === "") {
			setAnimate(true);
			setTimeout(() => {
				setAnimate(false);
			}, 500);
		}
		input.value = "";
	};

	const APIkey = "13c5098bba9bbfe9f9c5601c967d06b4";

	useEffect(() => {
		setLoading(true);

		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

		axios
			.get(url)
			.then((response) => {
				setTimeout(() => {
					setData(response.data);
					setLoading(false);
				}, 500);
			})
			.catch((err) => {
				setLoading(false);
				setErrorMsg(err);
			});
	}, [location]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrorMsg("");
		}, 2000);
		return () => clearTimeout(timer);
	}, [errorMsg]);

	if (!data) {
		return (
			<div
				style={{ backgroundImage: `url(${bg})` }}
				className="w-full h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center"
			>
				<div>
					<ImSpinner8 className="text-5xl animate-spin text-white" />
				</div>
			</div>
		);
	}

	let icon;
	switch (data.weather[0].main) {
		case "Clouds":
			icon = <IoMdCloudy />;
			break;
		case "Haze":
			icon = <BsCloudHaze2Fill />;
			break;
		case "Rain":
			icon = <IoMdRainy className="text-[#31cafb]" />;
			break;
		case "Clear":
			icon = <IoMdSunny className="text-[#ffde33]" />;
			break;
		case "Drizzle":
			icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
			break;
		case "Snow":
			icon = <IoMdSnow className="text-[#31cafb]" />;
			break;
		case "Thunderstorm":
			icon = <IoMdThunderstorm />;
			break;
	}
	const date = new Date();
	return (
		<div
			style={{ backgroundImage: `url(${bg})` }}
			className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0"
		>
			{errorMsg && (
				<div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">
					{errorMsg.response.data.message}
				</div>
			)}
			{/* {form} */}
			<form
				className={`${
					animate ? "animate-bounce" : "animate-none"
				} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blr-[32px] mb-8`}
			>
				<div className="h-full relative flex items-center justify-between p-2">
					<input
						onChange={(e) => handleInput(e)}
						className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
						type="text"
						placeholder="Search by city or country"
					/>
					<button
						onClick={(e) => handleSubmit(e)}
						className="bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition hover:bg-[#15abdd]"
					>
						<IoMdSearch className="text-2xl text-white" />
					</button>
				</div>
			</form>
			{/* {card} */}
			<div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
				{loading ? (
					<div className="w-full h-full flex items-center justify-center">
						<ImSpinner8 className="text-5xl animate-spin text-white" />
					</div>
				) : (
					<div>
						<div className="flex items-center gap-x-5 ">
							<div className="text-[87px]">{icon}</div>
							<div>
								<div className="text-2xl font-semibold">
									{data.name}, {data.sys.country}
								</div>
								<div>
									{date.getUTCDate()}/{date.getUTCMonth() + 1}/
									{date.getUTCFullYear()}
								</div>
							</div>
						</div>
						<div className="my-20">
							<div className="flex justify-center items-center">
								<div className="text-[144px] leading-none font-light">
									{parseInt(data.main.temp)}
								</div>
								<div className="text-4xl">
									<TbTemperatureCelsius />
								</div>
							</div>
							<div className="capitalize text-center">
								{data.weather[0].description}
							</div>
						</div>
						<div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
							<div className="flex justify-between">
								<div className="flex items-center gap-x-2">
									<div className="text-[20px]">
										<BsEye />
									</div>
									<div>
										Visibility{" "}
										<span className="ml-2">{data.visibility / 1000}</span> km
									</div>
								</div>
								<div className="flex items-center gap-x-2">
									<div className="text-[20px]">
										<BsThermometer />
									</div>
									<div className="flex">
										Feels like{" "}
										<div className="ml-2 flex">
											{parseInt(data.main.feels_like)}
											<TbTemperatureCelsius />
										</div>{" "}
										km
									</div>
								</div>
							</div>
							<div className="flex justify-between">
								<div className="flex items-center gap-x-2">
									<div className="text-[20px]">
										<BsWater />
									</div>
									<div>
										Humidity <span className="ml-2">{data.main.humidity}</span>{" "}
										%
									</div>
								</div>
								<div className="flex items-center gap-x-2">
									<div className="text-[20px]">
										<BsWind />
									</div>
									<div>
										Wind <span className="ml-2">{data.wind.speed} m/s</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
