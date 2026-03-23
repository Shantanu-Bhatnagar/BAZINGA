from providers.gemini_provider import GeminiProvider
from providers.gpt_provider import GPTProvider


def get_provider(name: str):
    if name == "gemini":
        return GeminiProvider()
    elif name == "gpt":
        return GPTProvider()
    else:
        raise ValueError(f"Unknown provider: {name}")