import React, { useState } from "react";

const THEME = {
  accent: "#feca57",
  background: "#ffffff",
  text: "#222f3e",
  input: "#222f3e",
  inputBackground: "#fafafa",
  borderColor: "#ddd",
  errorColor: "#ff5252",
  successColor: "#25b84c",
};

function generateEmpId() {
  return "EMP" + Date.now();
}

function generateFingerprint() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];
  const randomNumbers = String(Math.floor(100 + Math.random() * 900));
  return randomLetters + randomNumbers;
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^[0-9]{7,12}$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

function validate(values) {
  const errors = {};
  if (!values.empName) errors.empName = "Name required";
  if (!emailRegex.test(values.email || "")) errors.email = "Invalid email";
  if (!phoneRegex.test(values.phone || "")) errors.phone = "Invalid phone";
  if (!dateRegex.test(values.dob || "")) errors.dob = "Format DD/MM/YYYY";
  if (!dateRegex.test(values.doj || "")) errors.doj = "Format DD/MM/YYYY";
  if (!values.gender) errors.gender = "Gender required";
  return errors;
}

const INITIAL_FORM_VALUES = {
  empName: "Neha Sharma",
  aadhar: "4321-8765-2109",
  address: "Bangalore",
  department: "HR",
  designation: "HR Manager",
  dob: "12/07/1988",
  doj: "10/04/2021",
  email: "neha.sharma@example.com",
  fingerprint: generateFingerprint(),
  gender: "Female",
  pan: "LMNOP1234Q",
  password: "nehaPass!23",
  nationality: "Indian",
  phone: "9123456789",
  salaryCtc: "85000",
};

export default function AddEmployee() {
  const [form, setForm] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const inputHeight = 52;
  const inputStyles = {
    width: "100%",
    fontSize: 17,
    background: THEME.inputBackground,
    color: THEME.input,
    borderRadius: 7,
    border: `1px solid ${THEME.borderColor}`,
    padding: "0 16px",
    height: inputHeight,
    boxSizing: "border-box",
    marginTop: 7,
    fontWeight: 500,
    transition: "border-color 0.2s",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors({});
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length !== 0) {
      setErrors(errs);
      setSuccess("");
      return;
    }
    setSubmitting(true);
    const empId = generateEmpId();

    const payload = {
      empId,
      ...form,
    };

    try {
      const res = await fetch("http://localhost:8080/addEmp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Employee added successfully!");
        setForm({
          ...INITIAL_FORM_VALUES,
          fingerprint: generateFingerprint(),
        });
        setErrors({});
      } else {
        let errorMsg = `Failed to add employee. Status: ${res.status} ${res.statusText}`;
        try {
          const errorData = await res.json();
          if (errorData.message) errorMsg += ` - ${errorData.message}`;
        } catch (_) {}
        setSuccess(errorMsg);
      }
    } catch (error) {
      setSuccess("Network or server error: " + error.message);
    }
    setSubmitting(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        background: THEME.background,
        padding: "38px 4vw 40px 4vw",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ margin: "auto", maxWidth: "1400px" }}>
        <h2
          style={{
            color: THEME.accent,
            fontWeight: 700,
            fontSize: "2.4rem",
            letterSpacing: 1,
            marginBottom: 12,
            textAlign: "left",
          }}
        >
          Add Employee
        </h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
            gap: "36px 32px",
            background: "#fff",
            borderRadius: 14,
            padding: "38px 30px 30px 30px",
            color: THEME.text,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {[
            { value: "Name", name: "empName", type: "text" },
            { value: "Aadhar", name: "aadhar", type: "text" },
            { value: "Address", name: "address", type: "text" },
            { value: "Department", name: "department", type: "text" },
            { value: "Designation", name: "designation", type: "text" },
            { value: "Date of Birth", name: "dob", type: "text", placeholder: "DD/MM/YYYY" },
            { value: "Date of Joining", name: "doj", type: "text", placeholder: "DD/MM/YYYY" },
            { value: "Email", name: "email", type: "email" },
          ].map(({ value, name, type, placeholder }) => (
            <div key={name}>
              <label
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  display: "block",
                }}
              >
                {value}
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder || ""}
                  style={{
                    ...inputStyles,
                    outline: errors[name] ? `2px solid ${THEME.errorColor}` : "none",
                    borderColor: errors[name] ? THEME.errorColor : THEME.borderColor,
                  }}
                  required
                />
              </label>
              {errors[name] && (
                <div style={{ color: THEME.errorColor, fontSize: 13, marginTop: 2 }}>
                  {errors[name]}
                </div>
              )}
            </div>
          ))}

          {/* Phone number only */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="phone"
            >
              Phone
              <input
                type="text"
                id="phone"
                name="phone"
                maxLength={12}
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                style={{
                  ...inputStyles,
                  outline: errors.phone ? `2px solid ${THEME.errorColor}` : "none",
                  borderColor: errors.phone ? THEME.errorColor : THEME.borderColor,
                }}
              />
            </label>
            {errors.phone && (
              <div style={{ color: THEME.errorColor, fontSize: 13, marginTop: 2 }}>
                {errors.phone}
              </div>
            )}
          </div>

          {/* Gender dropdown */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="gender"
            >
              Gender
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                style={{
                  ...inputStyles,
                  padding: "0 16px",
                  cursor: "pointer",
                  outline: errors.gender ? `2px solid ${THEME.errorColor}` : "none",
                  borderColor: errors.gender ? THEME.errorColor : THEME.borderColor,
                }}
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
            {errors.gender && (
              <div style={{ color: THEME.errorColor, fontSize: 13, marginTop: 2 }}>
                {errors.gender}
              </div>
            )}
          </div>

          {/* PAN */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="pan"
            >
              PAN
              <input
                type="text"
                id="pan"
                name="pan"
                value={form.pan}
                onChange={handleChange}
                required
                style={{
                  ...inputStyles,
                }}
              />
            </label>
          </div>

          {/* Nationality */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="nationality"
            >
              Nationality
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                required
                style={{
                  ...inputStyles,
                }}
              />
            </label>
          </div>

          {/* Salary */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="salaryCtc"
            >
              Salary (CTC)
              <input
                type="text"
                id="salaryCtc"
                name="salaryCtc"
                value={form.salaryCtc}
                onChange={handleChange}
                required
                style={{
                  ...inputStyles,
                }}
              />
            </label>
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="password"
            >
              Password
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  ...inputStyles,
                }}
              />
            </label>
          </div>

          {/* Fingerprint (readonly) */}
          <div>
            <label
              style={{
                fontWeight: 600,
                fontSize: 16,
                display: "block",
              }}
              htmlFor="fingerprint"
            >
              Fingerprint
              <input
                type="text"
                id="fingerprint"
                name="fingerprint"
                value={form.fingerprint}
                readOnly
                style={{
                  ...inputStyles,
                  color: "#888",
                  background: "#f0f0f0",
                  border: "none",
                  letterSpacing: 3,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              />
              <span style={{ fontSize: 12, color: "#aaa" }}>
                Auto-generated. Refresh to regenerate.
              </span>
            </label>
          </div>

          {/* Submit and Cancel buttons */}
          <div
            style={{
              gridColumn: "1/-1",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{
                background: THEME.errorColor,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0 36px",
                fontSize: 20,
                fontWeight: 700,
                boxShadow: "0 2px 8px rgba(255, 82, 82, 0.6)",
                height: inputHeight,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#ff3333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = THEME.errorColor)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: THEME.accent,
                color: "#222f3e",
                border: "none",
                borderRadius: 8,
                padding: "0 36px",
                fontSize: 20,
                fontWeight: 700,
                boxShadow: "0 2px 8px #feca5733",
                height: inputHeight,
                cursor: submitting ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {submitting ? "Adding..." : "Add Employee"}
            </button>
          </div>

          {/* Success/Error message */}
          {success && (
            <div
              style={{
                gridColumn: "1/-1",
                color: success.includes("success") ? THEME.successColor : THEME.errorColor,
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
                marginBottom: 12,
                marginTop: -4,
              }}
            >
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
