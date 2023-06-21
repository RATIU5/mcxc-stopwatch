import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);
	const setIsCopying = useState(false)[1];

	const copy: CopyFn = async (text: string) => {
		if (!navigator?.clipboard) {
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			setIsCopying(true);
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			setIsCopying(false);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			setIsCopying(false);
			return false;
		}
	};

	return [copiedText, copy];
}

export default useCopyToClipboard;
