# coding: latin-1
###############################################################################
# eVotUM - Electronic Voting System
#
# initSigner-app.py
#
# Cripto-7.0.2 - Commmad line app to exemplify the usage of initSigner
#       function (see eccblind.py)
#
# Copyright (c) 2016 Universidade do Minho
# Developed by André Baptista - Devise Futures, Lda. (andre.baptista@devisefutures.com)
# Reviewed by Ricardo Barroso - Devise Futures, Lda. (ricardo.barroso@devisefutures.com)
#
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
#
###############################################################################
"""
Command line app that writes initComponents and pRDashComponents to STDOUT.
"""

import sys
import json
from eVotUM.Cripto import eccblind

initComponents, pRDashComponents = eccblind.initSigner()

def printUsage():
    print("Usage:")
    print("   'python init-app.py' - Para obter pRDashComponents")
    print("   'python init-app.py -init' - Para obter pRDashComponents e initComponents")
    print("   (As componentes serao guardadas no ficheiro 'assinante.json')\n")

def parseArgs():
    if(len(sys.argv) == 1):
        initPrDash()
    elif(len(sys.argv) == 2 and sys.argv[1] == "-init"):
        initComps()
    else:
        printUsage()

def initPrDash():
    print("\npRDashComponents: %s\n" % pRDashComponents)
    saveComponents()

def initComps():
    print("\nInit components: %s \n" % initComponents)
    print("\npRDashComponents: %s\n" % pRDashComponents)
    saveComponents()

def saveComponents():
    with open("assinante.json","r") as f:
        assinante = json.loads(f.read())
    assinante["initComponents"] = initComponents
    assinante["pRDashComponents"] = pRDashComponents

    with open("assinante.json","w") as f:
        f.write(json.dumps(assinante))

if __name__ == "__main__":
    #main()
    parseArgs()
