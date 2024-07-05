import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { universalurl } from "../helper";

const Leave = () => {
	const [formData, setFormData] = useState({
		name: "",
		employeeId: "",
		reason: "",
		numberOfDays: "",
		fromDate: "",
		toDate: "",
	});

	const [submittedData, setSubmittedData] = useState(null);

	// Fetch employee data when component mounts
	useEffect(() => {
		const fetchEmployeeData = async () => {
			try {
				const response = await axios.get(
					`${universalurl}/auth/get_employee_data`,
					{ withCredentials: true }
				);
				if (response.data) {
					setFormData((prevData) => ({
						...prevData,
						name: response.data.name,
						employeeId: response.data.empid,
					}));
				}
			} catch (error) {
				console.error("Error fetching employee data:", error);
			}
		};

		fetchEmployeeData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// Special handling for fromDate and toDate to ensure they are different
		if (name === "fromDate") {
			setFormData((prevData) => ({ ...prevData, [name]: value }));
		} else if (name === "toDate") {
			if (value < formData.fromDate) {
				alert("To date must be after from date");
			} else {
				setFormData((prevData) => ({ ...prevData, [name]: value }));
			}
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Log formData to check the values before submission
		console.log("Form Data on Submit:", formData);

		axios
			.post(
				`${universalurl}/auth/leave`,
				formData
			)
			.then((result) => {
				console.log(result.data);
				setSubmittedData(formData);
				Swal.fire({
					title: "Submitted Successfully!",
					text: "Your leave request has been submitted.",
					icon: "success",
				});
			})
			.catch((err) => {
				console.error(err);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
					footer: '<a href="#">Why do I have this issue?</a>',
				});
			});
	};

	return (
		<div className=" tw-mx-auto tw-p-4">
			<form onSubmit={handleSubmit} className="tw-space-y-4">
				<div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-4">
					<div>
						<label
							htmlFor="name"
							className="tw-block tw-mb-1 tw-mt-3"
						>
							Name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="tw-w-full tw-border tw-border-base-content tw-rounded-md tw-px-3 tw-py-2"
							readOnly // Make it read-only since it's fetched from the server
						/>
					</div>
					<div>
						<label
							htmlFor="employeeId"
							className="tw-block tw-mb-1 tw-mt-3"
						>
							Employee ID:
						</label>
						<input
							type="text"
							id="employeeId"
							name="employeeId"
							value={formData.employeeId}
							onChange={handleChange}
							className="tw-w-full tw-border tw-border-base-content tw-rounded-md tw-px-3 tw-py-2"
							readOnly
						/>
					</div>
				</div>
				<div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-4">
					<div>
						<label htmlFor="reason" className="tw-block tw-mb-1">
							Reason for Leave:
						</label>
						<textarea
							id="reason"
							name="reason"
							value={formData.reason}
							onChange={handleChange}
							className="tw-w-full tw-h-11 tw-border tw-border-base-content tw-rounded-md tw-px-3 tw-py-2"
						/>
					</div>
					<div>
						<label
							htmlFor="numberOfDays"
							className="tw-block tw-mb-1"
						>
							Number of Days:
						</label>
						<input
							type="number"
							id="numberOfDays"
							name="numberOfDays"
							value={formData.numberOfDays}
							onChange={handleChange}
							className="tw-w-full tw-border tw-border-base-content tw-rounded-md tw-px-3 tw-py-2"
						/>
					</div>
				</div>
				<div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-4">
					<div>
						<label htmlFor="fromDate" className="tw-block tw-mb-1">
							From Date:
						</label>
						<input
							type="date"
							id="fromDate"
							name="fromDate"
							value={formData.fromDate}
							onChange={handleChange}
							className="tw-w-full tw-border tw-border-base-content tw-rounded-md tw-px-3 tw-py-2"
						/>
					</div>
					<div>
						<label htmlFor="toDate" className="tw-block tw-mb-1">
							To Date:
						</label>
						<input
							type="date"
							id="toDate"
							name="toDate"
							value={formData.toDate}
							onChange={handleChange}
							className="tw-w-full tw-border tw-border-base-content tw-rounded-md tw-px-3 tw-py-2"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-w-full sm:tw-w-auto tw-justify-center"
				>
					Submit
				</button>
			</form>
			{submittedData && (
				<div className="tw-mt-4">
					<h2 className="tw-text-lg tw-font-bold tw-mb-2">
						Submitted Details:
					</h2>
					<ul>
						{Object.entries(submittedData).map(([key, value]) => (
							<li key={key}>
								<strong>{key}:</strong> {value}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Leave;
