"use client";

// import { parseEther, numberToHex } from 'viem'
import { useEffect, useCallback, useState, useMemo } from "react";
// import { signIn, signOut, getCsrfToken } from "next-auth/react";
import sdk, {
  FrameNotificationDetails,
  type FrameContext,
} from "@farcaster/frame-sdk";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useDisconnect,
  useConnect,
  useSwitchChain,
  useChainId,
} from "wagmi";

import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";
import { mainnet,
   optimism,
   polygon,
   base,
   arbitrum,
   degen } from "wagmi/chains";
import { BaseError, UserRejectedRequestError, parseEther } from "viem";


export default function Demo(
  { title }: { title?: string } = { title: "South Castle Gives" }
) {
  const [appUrl, setAppUrl] = useState('');
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [logger, setLogger] = useState({});
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState("base");
  const [ethPrice, setEthPrice] = useState();
  const [donationInProgress, setDonationInProgress] = useState(false);

  const [added, setAdded] = useState(false);
  const [notificationDetails, setNotificationDetails] =
    useState<FrameNotificationDetails | null>(null);

  const [lastEvent, setLastEvent] = useState("");

  const [addFrameResult, setAddFrameResult] = useState("");
  const [sendNotificationResult, setSendNotificationResult] = useState("");

  useEffect(() => {
    setNotificationDetails(context?.client.notificationDetails ?? null);
  }, [context]);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  const {
    switchChain,
    error: switchChainError,
    isError: isSwitchChainError,
    isPending: isSwitchChainPending,
  } = useSwitchChain();

  const handleSwitchChain = useCallback(() => {
    switchChain({ chainId: chainId === base.id ? optimism.id : base.id });
  }, [switchChain, chainId]);

  const switchToBase = () => {
    switchChain({ chainId: base.id });
  };
  
  const switchToMainnet = () => {
    switchChain({ chainId: mainnet.id });
  };
  
  const switchToOptimism = () => {
    switchChain({ chainId: optimism.id });
  };

  const switchToPolygon = () => {
    switchChain({ chainId: polygon.id });
  };

  const switchToArbitrum = () => {
    switchChain({ chainId: arbitrum.id });
  };

  const switchToDegen = () => {
    switchChain({ chainId: degen.id });
  };

  const getEndaomentTxDetails = async (chainId: any, amount: any, tokenAddress = null) => {
    try {
      const response = await fetch(
        `https://api.endaoment.org/v1/sdk/donations/swap?id=d937a50f-336b-4f0a-8143-7b47b03d0988&chainId=${chainId}&amountIn=${amount}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        setLogger(response)
      }

      const data = await response.json();

      return data;
    } catch (e) {
      return null;
    }
  }

  const donate = async () => {
    if(!donationInProgress) {
      setDonationInProgress(true);
      let chainId;
      let tokenAddress;
      console.log('selectedChain', selectedChain)
      switch (selectedChain) {
          case 'mainnet':
            await switchToMainnet();
            chainId = mainnet.id;
            break;
  
          case 'base':
            console.log('in base case', selectedChain)
            chainId = base.id;
            await switchToBase();
            break;
  
          case 'optimism':
            await switchToOptimism();
            chainId = optimism.id;
            break;
  
          case 'arbitrum':
            await switchToArbitrum();
            chainId = arbitrum.id;
            break;
  
          case 'polygon':
            await switchToPolygon();
            chainId = polygon.id;
            break;
      }
      // let amount = parseEther(amount.toString());
      
      const txDetails = await getEndaomentTxDetails(chainId, parseEther(amount.toString()), tokenAddress)
      txDetails.chainId = chainId;
  
      sendDonationTx(txDetails);
      
      console.log('tx details', txDetails)
      setLogger(txDetails)
    }
  }

  const sendDonationTx = async (details) => {
    sendTransaction(
      details,
      {
        onSuccess: (hash) => {
          setDonationInProgress(false);
          setTxHash(hash);
          sdk.actions.openUrl(`https://warpcast.com/~/compose?text=I%20just%20donated%20to%20South%20Castle%27s%20New%20Year%27s%20charity%20drive%20supporting%20GiveDirectly%21%0A%0ACheck%20out%20the%20frame%20below%20if%20you%27d%20like%20to%20make%20a%20contribution%20to%20support%20this%20great%20cause%0A%0A%F0%9F%8F%B0%20%21attack%20north%20%26%20Happy%20New%20Year%21%20%F0%9F%8F%B0
          &embeds[]=${appUrl}`)
        },
        onError: (error) => {
          setDonationInProgress(false);
        }
      }
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppUrl(window.location.origin); // Get the base URL
    }
    
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(response => {
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }
      response?.json()
      .then(res => {
        console.log(`Ethereum price in USD: ${res?.ethereum?.usd}`);
        setEthPrice(res?.ethereum?.usd);
      })
    })
    .catch(error => {
      console.error('Error fetching Ethereum price:', error);
    });
  }, [])

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      setAdded(context.client.added);

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setLastEvent(
          `frameAdded${!!notificationDetails ? ", notifications enabled" : ""}`
        );

        setAdded(true);
        if (notificationDetails) {
          setNotificationDetails(notificationDetails);
        }
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        setLastEvent(`frameAddRejected, reason ${reason}`);
      });

      sdk.on("frameRemoved", () => {
        setLastEvent("frameRemoved");
        setAdded(false);
        setNotificationDetails(null);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        setLastEvent("notificationsEnabled");
        setNotificationDetails(notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        setLastEvent("notificationsDisabled");
        setNotificationDetails(null);
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  const openUrl = useCallback(() => {
    sdk.actions.openUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }, []);

  const openWarpcastUrl = useCallback(() => {
    sdk.actions.openUrl(`https://warpcast.com/~/compose?text=I%20just%20donated%20to%20South%20Castle%27s%20New%20Year%27s%20charity%20drive%20supporting%20GiveDirectly%21%0A%0ACheck%20out%20the%20frame%20below%20if%20you%27d%20like%20to%20make%20a%20contribution%20to%20support%20this%20great%20cause%0A%0A%F0%9F%8F%B0%20%21attack%20north%20%26%20Happy%20New%20Year%21%20%F0%9F%8F%B0
&embeds[]=https://frames.neynar.com/f/5bc2b9f1/87778996`)
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const addFrame = useCallback(async () => {
    try {
      setNotificationDetails(null);

      const result = await sdk.actions.addFrame();

      if (result.added) {
        if (result.notificationDetails) {
          setNotificationDetails(result.notificationDetails);
        }
        setAddFrameResult(
          result.notificationDetails
            ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
            : "Added, got no notification details"
        );
      } else {
        setAddFrameResult(`Not added: ${result.reason}`);
      }
    } catch (error) {
      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  const sendNotification = useCallback(async () => {
    setSendNotificationResult("");
    if (!notificationDetails || !context) {
      return;
    }

    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        mode: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fid: context.user.fid,
          notificationDetails,
        }),
      });

      if (response.status === 200) {
        setSendNotificationResult("Success");
        return;
      } else if (response.status === 429) {
        setSendNotificationResult("Rate limited");
        return;
      }

      const data = await response.text();
      setSendNotificationResult(`Error: ${data}`);
    } catch (error) {
      setSendNotificationResult(`Error: ${error}`);
    }
  }, [context, notificationDetails]);

  const sendTx = async () => {
    // return new Promise(async (resolve, reject) => {
      try {
        sendTransaction(
          {
            // call yoink() on Yoink contract
            to: "0x4bBFD120d9f352A0BEd7a014bd67913a2007a878",
            data: "0x9846cd9efc000023c0",
          },
          {
            onSuccess: (hash) => {
              setTxHash(hash);
              sdk.actions.openUrl(`https://warpcast.com/~/compose?text=test%20demo%20I%20just%20donated%20${amount}%20to%20the%20south%20castle%20charity%20drive%20!attack%20north&embeds[]=https://frames.neynar.com/f/5bc2b9f1/87778996`)
              // resolve();
            },
          }
        );
      } catch (e) {
        console.log(e)
        // reject(e);
      }
    // })
  };

  const signTyped = useCallback(() => {
    signTypedData({
      domain: {
        name: "Frames v2 Demo",
        version: "1",
        chainId,
      },
      types: {
        Message: [{ name: "content", type: "string" }],
      },
      message: {
        content: "Hello from Frames v2!",
      },
      primaryType: "Message",
    });
  }, [chainId, signTypedData]);

  const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ 
      paddingTop: context?.client.safeAreaInsets?.top ?? 0, 
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0 ,
    }}>
      <div className="w-[300px] mx-auto py-2 px-2">
        {/* <input
          className="font-mono text-xs whitespace-pre-wrap break-words overflow-x- p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2 mb-4 p-2 border rounded"
          type="text"
          value={}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type something..."
        /> */}

        <br />
        <div className="font-2xl text-xl font-bold">🏰 Welcome to the very first South Castle charity drive 🏰</div>
        <br />

        <div className="mt-2 mb-4 text-sm">
          To kick the new year off right, the South Castle has decided to put together a charity drive to raise money for <a href='https://www.givedirectly.org/' className="text-blue-400 hover:underline"> GiveDirectly.</a> These on-chain donations made possible thanks to <a href='https://endaoment.org/' className="text-blue-400 hover:underline">Endaoment's</a> technology and thanks to the very generous support of <button onClick={() => sdk.actions.openUrl('https://warpcast.com/raulonastool')} className="text-blue-400 hover:underline">raulonastool</button>, the first $200 of donations will be 100% matched!

        </div>
        <div className="mt-2 mb-4 text-sm">
          All you have to do is select which chain you want to use, enter the amount you want to give and then click the button to donate and share your contribution via a special !attack north cast!

        </div>
        <div className="mt-2 mb-4 text-sm">
          If you are able to give, we thank you very much and we hope that everyone's 2025 is off to a great start!!
          
          {/* it would be a good thing to do a little charity drive to share some
          In light of the South Castle's numerous successes in 2024, we have decided it would be a nice thing to kick off 2025 by sharing some of that wealth and bounty. To do this @entwinedlines has built this frame using endaoment's technology to 
          Simply select which nnetwork you;d like to donate on, input an amount and click the button to make your donation and share your contribution vvia a custom !attsck north cast. */}
        </div>

        <select
          className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2"
          onChange={(event) => setSelectedChain(event.target.value)}
        >
          <option value="base" disabled>Select network</option>
          <option value="base">Eth (Base)</option>
          <option value="optimism">Eth (Optimism)</option>
          {/* <option value="arbitrum">Eth (Arbitrum)</option> */}
          {/* <option value="polygon">Eth (Polygon)</option> */}
          {/* <option value="degen">Degen</option> */}
          <option value="mainnet">Eth (Mainnet)</option>
        </select>
        
        <input
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2"
          value={amount || ""}
          onChange={(event) => {
            const value = event.target.value;
            // Regular expression to allow only numbers and a single period
            if (/^\d*\.?\d*$/.test(value)) {
              setAmount(value);
            }
          }}
          placeholder="amount"
          />

        <div className="mt-2 mb-4 text-sm">
          {(ethPrice && amount)
            ? `$${Number(ethPrice * amount).toFixed(2)}`
            : ''}
        </div>

        <Button
          onClick={donate}
          disabled={donationInProgress}
          className="w-full max-w-xs mx-auto block bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          {donationInProgress ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              <span>Processing...</span>
            </div>
          ) : (
            "donate and !attack north"
          )}
        </Button>
        {/* <Button onClick={donate}>donate and !attack north</Button> */}
        
        <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>

        
        {/* <div className="mb-4">
          <h2 className="font-2xl font-bold">Context</h2>
          <button
            onClick={toggleContext}
            className="flex items-center gap-2 transition-colors"
          >
            <span
              className={`transform transition-transform ${
                isContextOpen ? "rotate-90" : ""
              }`}
            >
              ➤
            </span>
            Tap to expand
          </button>

          {isContextOpen && (
            <div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
                {JSON.stringify(logger, null, 2)}
              </pre>
            </div>
          )}
        </div> */}
        

      </div>
    </div>
  );
}

function SignMessage() {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const {
    signMessage,
    data: signature,
    error: signError,
    isError: isSignError,
    isPending: isSignPending,
  } = useSignMessage();

  const handleSignMessage = useCallback(async () => {
    if (!isConnected) {
      await connectAsync({
        chainId: base.id,
        connector: config.connectors[0],
      });
    }

    signMessage({ message: "Hello from Frames v2!" });
  }, [connectAsync, isConnected, signMessage]);

  return (
    <>
      <Button
        onClick={handleSignMessage}
        disabled={isSignPending}
        isLoading={isSignPending}
      >
        Sign Message
      </Button>
      {isSignError && renderError(signError)}
      {signature && (
        <div className="mt-2 text-xs">
          <div>Signature: {signature}</div>
        </div>
      )}
    </>
  );
}

function SendEth() {
  const { isConnected, chainId } = useAccount();
  const {
    sendTransaction,
    data,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const toAddr = useMemo(() => {
    // Protocol guild address
    return chainId === base.id
      ? "0x32e3C7fD24e175701A35c224f2238d18439C7dBC"
      : "0xB3d8d7887693a9852734b4D25e9C0Bb35Ba8a830";
  }, [chainId]);

  const handleSend = useCallback(() => {
    sendTransaction({
      to: toAddr,
      value: 1n,
    });
  }, [toAddr, sendTransaction]);

  return (
    <>
      <Button
        onClick={handleSend}
        disabled={!isConnected || isSendTxPending}
        isLoading={isSendTxPending}
      >
        Send Transaction (eth)
      </Button>
      {isSendTxError && renderError(sendTxError)}
      {data && (
        <div className="mt-2 text-xs">
          <div>Hash: {truncateAddress(data)}</div>
          <div>
            Status:{" "}
            {isConfirming
              ? "Confirming..."
              : isConfirmed
              ? "Confirmed!"
              : "Pending"}
          </div>
        </div>
      )}
    </>
  );
}


const renderError = (error: Error | null) => {
  if (!error) return null;
  if (error instanceof BaseError) {
    const isUserRejection = error.walk(
      (e) => e instanceof UserRejectedRequestError
    );

    if (isUserRejection) {
      return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>;
    }
  }

  return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
};
