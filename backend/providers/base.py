from abc import ABC, abstractmethod
from typing import Dict

class LLMProvider(ABC):
    """
    Abstract base class for all LLM providers
    """
    @abstractmethod
    def generate_code(self, prompt: str) -> dict:
        pass