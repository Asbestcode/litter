export default function ProviderLogo({provider}) {
    const isGoogle = provider === "Google"
    return (
        <img src={isGoogle ? "/google.png"  : "/email.png"} alt={isGoogle ? "Google Logo"  : "E-Mail icon"} className="h-10"/>
    )
}