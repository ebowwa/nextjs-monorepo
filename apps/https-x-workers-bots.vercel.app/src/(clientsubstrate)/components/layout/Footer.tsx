import footerData from '../../../../public/html/footer.json';

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-12 text-center text-sm text-gray-400">
      <div className="mb-4">
        {footerData.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="mx-2 hover:text-gray-200 transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        {footerData.socialMedia.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
          >
            {social.platform}
          </a>
        ))}
      </div>
      <p className="mt-4">{footerData.copyright}</p>
    </footer>
  );
}