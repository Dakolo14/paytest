
import { Link } from 'react-router-dom'

const Terms = () => {
  return (
    <div className='pb-8'>
      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          1. Introduction
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          Welcome to PayFly! By using our mobile payment app, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the PayFly platform.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          2. Use of PayFly Services
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          PayFly is designed for users in Nigeria and is governed by Nigerian laws. By registering for a PayFly account, you agree to provide accurate, current, and complete information.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          3. Account Security
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          You are responsible for maintaining the confidentiality of your PayFly account and any actions that occur under your account. You agree to use strong, secure passwords and take appropriate security measures such as enabling biometric login or PIN codes. If you suspect any unauthorized access to your account, you must notify PayFly immediately.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          4. Fees
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          PayFly does not charge users for creating an account or for basic app usage. However, certain transactions or services (e.g., using specific payment methods or third-party services) may incur fees. Your bank or card issuer may charge fees related to transactions or payments made through PayFly. PayFly is not responsible for these charges.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          5. Acceptable Use
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          PayFly must only be used for legal purposes. You agree not to use the service for any unlawful activities, including fraud, money laundering, or any activities prohibited by Nigerian law. PayFly reserves the right to suspend or terminate accounts that violate these terms or engage in suspicious activity.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          6. Privacy
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          Your privacy is important to us. Please refer to our <Link to="/privacy-policy" className='text-primary-500'>Privacy Policy</Link> to understand how we collect, use, and safeguard your information.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          7. Termination
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          PayFly reserves the right to terminate or suspend your account at any time if you violate these terms or if we believe it is necessary for security or legal reasons.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          8. Changes to Terms
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          PayFly may update these Terms of Use periodically. Continued use of PayFly after changes take effect means you accept the new terms. We encourage you to review these terms regularly.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
        9. Governing Law
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
        </p>
      </div>

      <div className="mb-2">
        <h3 className="mt-2 text-lg font-semibold text-white text-left">
          10. Contact Us
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          If you have any questions about these terms, please contact us at {" "}
          <a href="mailto:payflyltd@gmail.com" className="text-primary-500 hover:underline">
            payflyltd@gmail.com
          </a>.
        </p>
      </div>
    </div>
  )
}

export default Terms
