import React from 'react';

// Shared
import { Contact } from '../../shared/constants/constants';
import { URL } from '../../shared/config/config';

// Images
import PrivacyPolicyBanner from './assets/privacy_policy_banner.png';

// CSS
import styles from './Styles.module.css';

const PrivacyPolicy: React.FC = () => {
	return (
		<div
			className={`${styles.privacyPolicyContainer} page-container text-white-secondary`}
		>
			<img
				src={PrivacyPolicyBanner}
				alt='Privacy Policy Banner'
				className='banner'
			/>
			<div className={styles.policyTextContainer}>
				<h2>Privacy Policy</h2>
				<p>
					Your privacy is important to us. It is Rift Builds&#39; policy to
					respect your privacy and comply with any applicable law and regulation
					regarding any personal information we may collect about you, including
					across our website, <a href={URL.CLIENT}>{URL.CLIENT}</a>, and other
					sites we own and operate.{' '}
				</p>
				<p>
					This policy is effective as of 15 April 2021 and was last updated on
					16 April 2021.{' '}
				</p>
				<h3>Information We Collect</h3>
				<p>
					Information we collect includes both information you knowingly and
					actively provide us when using or participating in any of our services
					and promotions, and any information automatically sent by your devices
					in the course of accessing our products and services.{' '}
				</p>
				<h4>Log Data</h4>
				<p>
					When you visit our website, our servers may automatically log the
					standard data provided by your web browser. It may include your
					device’s Internet Protocol (IP) address, your browser type and
					version, the pages you visit, the time and date of your visit, the
					time spent on each page, other details about your visit, and technical
					details that occur in conjunction with any errors you may encounter.{' '}
				</p>
				<p>
					Please be aware that while this information may not be personally
					identifying by itself, it may be possible to combine it with other
					data to personally identify individual persons.{' '}
				</p>
				<h4>Collection and Use of Information</h4>
				<p>
					We may collect personal information from you when you do any of the
					following on our website:{' '}
				</p>
				<ul>
					<li>Use a mobile device or web browser to access our content</li>
					<li>
						Contact us via email, social media, or on any similar technologies
					</li>
					<li>When you mention us on social media</li>
				</ul>
				<p>
					We may collect, hold, use, and disclose information for the following
					purposes, and personal information will not be further processed in a
					manner that is incompatible with these purposes:{' '}
				</p>
				<p>
					Please be aware that we may combine information we collect about you
					with general information or research data we receive from other
					trusted sources.{' '}
				</p>

				<h3>Use of Cookies</h3>
				<p>
					We use &ldquo;cookies&rdquo; to collect information about you and your
					activity across our site. A cookie is a small piece of data that our
					website stores on your computer, and accesses each time you visit, so
					we can understand how you use our site. This helps us serve you
					content based on preferences you have specified.{' '}
				</p>
				<h3>Limits of Our Policy</h3>
				<p>
					Our website may link to external sites that are not operated by us.
					Please be aware that we have no control over the content and policies
					of those sites, and cannot accept responsibility or liability for
					their respective privacy practices.{' '}
				</p>
				<h3>Changes to This Policy</h3>
				<p>
					At our discretion, we may change our privacy policy to reflect updates
					to our business processes, current acceptable practices, or
					legislative or regulatory changes. If we decide to change this privacy
					policy, we will post the changes here at the same link by which you
					are accessing this privacy policy.{' '}
				</p>
				<p>
					If required by law, we will get your permission or give you the
					opportunity to opt in to or opt out of, as applicable, any new uses of
					your personal information.{' '}
				</p>
				<h3>Contact Us</h3>
				<p>
					For any questions or concerns regarding your privacy, you may contact
					us using the following details:{' '}
				</p>
				<p>
					Rift Builds
					<br />
					{Contact.EMAIL_ADDRESS}
				</p>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
