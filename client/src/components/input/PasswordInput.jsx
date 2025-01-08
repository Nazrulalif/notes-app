import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-600"
      >
        Password
      </label>
      <div className="flex items-center bg-transparent py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter your password"}
          type={isShowPassword ? "text" : "password"}
          id="password"
          name="password"
          className="w-full px-3 text-gray-700  rounded-lg focus:outline-none"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="mr-2 focus:outline-none"
        >
          {isShowPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
